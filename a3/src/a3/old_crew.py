import os
from dotenv import load_dotenv
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import FileReadTool
from a3.tools.custom_tool import GenerateImageTool, RemoveBGTool, CleanCodeOutputTool
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI  # 更新导入路径

# 加载环境变量
load_dotenv()

# 确保目录存在
def ensure_directories_exist():
    directories = ['config', 'game_data']
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"Created directory: {directory}")

# 检查必要的环境变量
def check_environment_variables():
    required_vars = ['OPENAI_API_KEY', 'ANTHROPIC_API_KEY']
    missing_vars = [var for var in required_vars if not os.getenv(var)]
    
    if missing_vars:
        raise EnvironmentError(f"Missing required environment variables: {', '.join(missing_vars)}")
    
    # 如果ANTHROPIC_MODEL未设置，设置一个默认值
    if not os.getenv("ANTHROPIC_MODEL"):
        os.environ["ANTHROPIC_MODEL"] = "anthropic/claude-3-5-sonnet-20240620"
        print("ANTHROPIC_MODEL environment variable was not set. Using default: anthropic/claude-3-5-sonnet-20240620")

@CrewBase
class A3:
    """RPG Game Development Crew"""

    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    def __init__(self):
        # 初始化时检查环境和目录
        ensure_directories_exist()
        check_environment_variables()

    # ✅ 使用 OpenAI GPT 模型的角色绘制 Agent
    @agent
    def rolesDrawer(self) -> Agent:
        dalle_llm = ChatOpenAI(
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['rolesDrawer'],
            verbose=True,
            llm=dalle_llm,
            tools=[GenerateImageTool(),RemoveBGTool()]
        )

    # 🎭 游戏故事创作 Agent
    @agent
    def game_story_writer(self) -> Agent:
        claude_llm = ChatAnthropic(
            model_name="anthropic/claude-3-5-sonnet-20240620",  # 修正模型名称格式
            api_key=os.getenv("ANTHROPIC_API_KEY"),
            max_tokens=4000,  
        )
        return Agent(
            config=self.agents_config['game_story_writer'],
            llm=claude_llm,
            verbose=True,
            tools=[]
        )

    # 🧠 游戏逻辑编码 Agent
    @agent
    def game_logic_programmer(self) -> Agent:
        claude_llm = ChatAnthropic(
            model_name="anthropic/claude-3-5-sonnet-20240620",
            api_key=os.getenv("ANTHROPIC_API_KEY"),
            max_tokens=4000,  
        )
        return Agent(
            config=self.agents_config['game_logic_programmer'],
            llm=claude_llm,
            verbose=True,
            tools=[FileReadTool(), CleanCodeOutputTool()]  
        )

    @agent
    def game_logic_designer(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['game_logic_designer'],
            verbose=True,
            llm=dalle_llm,
            tools=[FileReadTool()]
        )

    # 👤 角色设计 Agent
    @agent
    def RoleDesigner(self) -> Agent:
        claude_llm = ChatAnthropic(
            model_name="anthropic/claude-3-5-sonnet-20240620",  # 修正模型名称格式
            api_key=os.getenv("ANTHROPIC_API_KEY"),
            max_tokens=4000,  
        )
        return Agent(
            config=self.agents_config['RoleDesigner'],
            llm=claude_llm,
            verbose=True,
            tools=[]
        )

    # 💬 对话设计 Agent
    @agent
    def DialogDesigner(self) -> Agent:
        claude_llm = ChatAnthropic(
            model_name="anthropic/claude-3-5-sonnet-20240620",
            api_key=os.getenv("ANTHROPIC_API_KEY"),
            max_tokens=4000,  
        )
        return Agent(
            config=self.agents_config['DialogDesigner'],
            verbose=True,
            llm=claude_llm,
            tools=[FileReadTool()]
        )


    # 🏞️ 场景设计 Agent
    @agent
    def ScenesDesigner(self) -> Agent:
        dalle_llm = ChatOpenAI(
            model="gpt-4-turbo",  # 或 "gpt-3.5-turbo" 更经济
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['ScenesDesigner'],
            verbose=True,
            llm=dalle_llm,
            tools=[]
        )


    # 🖥️ 图形工程师 Agent
    @agent
    def GraphicsEngineer(self) -> Agent:
        dalle_llm = ChatOpenAI(
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['GraphicsEngineer'],
            verbose=True,
            llm=dalle_llm,
            tools=[GenerateImageTool(), RemoveBGTool()]
        )


    # 🎮 对话控制器 Agent
    @agent
    def DialogController(self) -> Agent:
        claude_llm = ChatAnthropic(
            model_name="anthropic/claude-3-5-sonnet-20240620",
            api_key=os.getenv("ANTHROPIC_API_KEY"),
            max_tokens=4000,  
        )
        return Agent(
            config=self.agents_config['DialogController'],
            verbose=True,
            llm=claude_llm,
            tools=[FileReadTool()]
        )



    # 🧠 任务定义
    @task
    def game_story_writing_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_story_writing_task']
        )

    @task
    def game_character_design_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_character_design_task'],
            output_file='game_data/characters.md'
        )


    @task
    def game_character_image_generation_task(self) -> Task:
        task_config = self.tasks_config['game_character_image_generation_task']

        return Task(
            description=task_config["description"],
            expected_output=task_config["expected_output"],
            context=task_config.get("context", []),
            agent=self.rolesDrawer(),
        )


    @task
    def game_scene_prompt_generation_task(self) -> Task:
        task_config = self.tasks_config["game_scene_prompt_generation_task"]
        return Task(
            description=task_config["description"],
            expected_output=task_config["expected_output"],
            context=task_config.get("context", []),
            agent=self.ScenesDesigner(),  # 使用 Claude 或 OpenAI 均可
            output_file="game_data/scene_prompts.md"  # 可选：保存结果
        )

    
    @task
    def game_scene_background_generation_task(self) -> Task:
        task_config = self.tasks_config["game_scene_background_generation_task"]
        return Task(
            description=task_config["description"],
            expected_output=task_config["expected_output"],
            context=task_config.get("context", []),
            agent=self.GraphicsEngineer()
        )

    @task
    def game_weapon_magic_image_generation_task(self) -> Task:
        task_config = self.tasks_config["game_weapon_magic_image_generation_task"]
        return Task(
            description=task_config["description"],
            expected_output=task_config["expected_output"],
            context=task_config.get("context", []),
            agent=self.rolesDrawer(),
            output_file="a4/images/weapons_magic_output.txt"
        )


    @task
    def game_dialogue_writing_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_dialogue_writing_task'],
            output_file='game_data/dialogues.js'
        )

    @task
    def game_dialogue_control_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_dialogue_control_task'],
            output_file='game_data/DialogControl.js'
        )


    @task
    def game_scene_logic_design_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_scene_logic_design_task'],
            output_file='a4/scene_logic.md'
        )

    @task
    def game_logic_code_update_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_logic_code_update_task']
        )

    @task
    def game_player_code_update_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_player_code_update_task']
        )

    @task
    def game_enemy_code_update_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_enemy_code_update_task']
        )

    # 🏗 Crew 组建
    @crew
    def crew(self) -> Crew:
        try:
            return Crew(
                agents=self.agents,
                tasks=[
                    self.game_story_writing_task(),
                   # self.game_character_design_task(),
                  #  self.game_character_image_generation_task(),
                  #  self.game_scene_prompt_generation_task(),
                   # self.game_scene_background_generation_task(),
                   # self.game_dialogue_writing_task(),
                    #self.game_dialogue_control_task(),
                   # self.game_weapon_magic_image_generation_task(),
                    self.game_scene_logic_design_task(),
                    self.game_logic_code_update_task(),
                    self.game_player_code_update_task(),
                    self.game_enemy_code_update_task()

                ],
                process=Process.sequential,
                verbose=True
            )
        except Exception as e:
            print(f"Error creating crew: {str(e)}")
            raise
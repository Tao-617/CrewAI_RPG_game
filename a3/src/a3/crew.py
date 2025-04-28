import os
from dotenv import load_dotenv
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import FileReadTool
from a3.tools.custom_tool import GenerateImageTool, RemoveBGTool, FileInsertOrReplaceTool, FileWriteTool
from langchain_anthropic import ChatAnthropic
from langchain_openai import ChatOpenAI

# --- 初始化 ---

load_dotenv()

def ensure_directories_exist():
    directories = ['config', 'a4/data', 'a4/javascripts', 'a4/images/backgrounds', 'a4/images/portrait', 'a4/images/weapons']
    for dir in directories:
        os.makedirs(dir, exist_ok=True)

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
        ensure_directories_exist()
        check_environment_variables()

    # --- Agents 定义 ---
    @agent
    def StoryTellerAgent(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['StoryTellerAgent'],
            verbose=True,
            llm=dalle_llm
        )

    @agent
    def AssetGeneratorAgent(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['AssetGeneratorAgent'],
            verbose=True,
            llm=dalle_llm,
            tools=[FileReadTool(), GenerateImageTool(), RemoveBGTool()]
        )

    @agent
    def BackgroundImageAgent(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['BackgroundImageAgent'],
            verbose=True,
            llm=dalle_llm,
            tools=[FileReadTool(), GenerateImageTool()]
        )

    @agent
    def PlayerDeveloperAgent(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['PlayerDeveloperAgent'],
            verbose=True,
            llm=dalle_llm,
            tools=[FileReadTool(),FileInsertOrReplaceTool()],
        )

    @agent
    def EnemyDeveloperAgent(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['EnemyDeveloperAgent'],
            verbose=True,
            llm=dalle_llm,
            tools=[FileReadTool(),FileWriteTool()],
        )

    @agent
    def BackgroundManagerAgent(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['BackgroundManagerAgent'],
            verbose=True,
            llm=dalle_llm,
            tools=[FileReadTool(),FileWriteTool()],
        )

    @agent
    def DialogueWriterAgent(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['DialogueWriterAgent'],
            verbose=True,
            llm=dalle_llm,
            tools=[FileReadTool(),FileWriteTool()],
        )

    @agent
    def DialogueControllerAgent(self) -> Agent:
        dalle_llm = ChatOpenAI(  # 这里用 GPT-4-Turbo
            model="gpt-4-turbo",
            temperature=0.5,
            openai_api_key=os.getenv("OPENAI_API_KEY")
        )
        return Agent(
            config=self.agents_config['DialogueControllerAgent'],
            verbose=True,
            llm=dalle_llm,
            tools=[FileReadTool(),FileInsertOrReplaceTool()],
        )

    # --- Tasks 定义 ---
    @task
    def story_writing_task(self) -> Task:
        return Task(config=self.tasks_config['story_writing_task'])

  
    @task
    def background_generation_task(self) -> Task:
        return Task(config=self.tasks_config['background_generation_task'])

    @task
    def character_image_generation_task(self) -> Task:
        return Task(config=self.tasks_config['character_image_generation_task'])

    @task
    def weapon_image_generation_task(self) -> Task:
        return Task(config=self.tasks_config['weapon_image_generation_task'])

    @task
    def image_code_modify_task(self) -> Task:
        return Task(config=self.tasks_config['image_code_modify_task'])

    @task
    def enemy_code_development_task(self) -> Task:
        return Task(config=self.tasks_config['enemy_code_development_task'])

    @task
    def background_manager_development_task(self) -> Task:
        return Task(config=self.tasks_config['background_manager_development_task'])

    @task
    def dialogue_writing_task(self) -> Task:
        return Task(config=self.tasks_config['dialogue_writing_task'])

    @task
    def dialogue_controller_update_task(self) -> Task:
        return Task(config=self.tasks_config['dialogue_controller_update_task'])


    # --- Crew 定义 ---
    @crew
    def crew(self) -> Crew:
        try:
            return Crew(
                agents=self.agents,
                tasks=[
                    self.story_writing_task(),
                                  
                    self.dialogue_writing_task(),
                    self.dialogue_controller_update_task(),
                    # self.background_generation_task(),
                    self.character_image_generation_task(),
                    self.weapon_image_generation_task(),

                    self.image_code_modify_task(),
                    # self.enemy_code_development_task(),
                    # self.background_manager_development_task(),

                ],

                process=Process.sequential,
                verbose=True
            )
        except Exception as e:
            print(f"Error creating crew: {str(e)}")
            raise

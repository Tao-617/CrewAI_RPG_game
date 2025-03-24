import sys
import os
from crewai import Agent, Crew, Process, Task
from crewai.project import CrewBase, agent, crew, task
from crewai_tools import FileReadTool

@CrewBase
class A3:
    """RPG Game Development Crew"""

    # 代理和任务配置文件
    agents_config = 'config/agents.yaml'
    tasks_config = 'config/tasks.yaml'

    # 🎭 **游戏故事创作**
    @agent
    def game_story_writer(self) -> Agent:
        return Agent(
            config=self.agents_config['game_story_writer'],
            verbose=True,
            tools=[]
        )

    # 🎨 **游戏角色设计**
    @agent
    def RoleDesigner(self) -> Agent:
        return Agent(
            config=self.agents_config['RoleDesigner'],
            verbose=True,
            tools=[]
        )

    # 💬 **游戏对话编写**
    @agent
    def DialogDesigner(self) -> Agent:
        return Agent(
            config=self.agents_config['DialogDesigner'],
            verbose=True,
            tools=[FileReadTool()]
        )

    # 🌎 **游戏环境设计**
    @agent
    def ScenesDesigner(self) -> Agent:
        return Agent(
            config=self.agents_config['ScenesDesigner'],
            verbose=True,
            tools=[FileReadTool()]
        )

    # 💻 **游戏程序员**
    @agent
    def GraphicsEngineer(self) -> Agent:
        return Agent(
            config=self.agents_config['GraphicsEngineer'],
            verbose=True,
            tools=[FileReadTool()]
        )


    # ⚙️ **游戏机制开发**
    @agent
    def DialogController(self) -> Agent:
        return Agent(
            config=self.agents_config['DialogController'],
            verbose=True,
            tools=[FileReadTool()]
        )


    # 🛠 **游戏测试**
    @agent
    def GameTester(self) -> Agent:
        return Agent(
            config=self.agents_config['GameTester'],
            verbose=True,
            tools=[]
        )

    # # 🎮 **游戏 UI 设计**
    # @agent
    # def game_ui_designer(self) -> Agent:
    #     return Agent(
    #         config=self.agents_config['game_ui_designer'],
    #         verbose=True,
    #         tools=[]
    #     )

      # 🎭 **游戏故事任务**
    @task
    def game_story_writing_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_story_writing_task'],
            output_file='game_data/story.md'
        )

    # 🎨 **游戏角色任务**
    @task
    def game_character_design_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_character_design_task'],
            output_file='game_data/characters.md'
        )

    # 🏞 **游戏场景设计任务**
    @task
    def game_environment_design_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_environment_design_task'],
            output_file='game_data/environments.js'
        )

    # 💻 **游戏场景编程任务**
    @task
    def game_scene_programming_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_scene_programming_task'],
            output_file='game_data/background.js'
        )

    # 💬 **游戏对话任务**
    @task
    def game_dialogue_writing_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_dialogue_writing_task'],
            output_file='game_data/dialogues.js'
        )

    # ⚙️ **游戏对话控制任务**
    @task
    def game_dialogue_control_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_dialogue_control_task'],
            output_file='game_data/DialogControl.js'
        )

    # 🛠 **游戏场景测试任务**
    @task
    def game_test_background(self) -> Task:
        return Task(
            config=self.tasks_config['game_test_background'],
            output_file='game_data/test_report.md'
        )

    # 🎨 **游戏图形代码更新任务**
    @task
    def game_graphics_code_update_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_graphics_code_update_task'],
            output_file='game_data/background_update.js'
        )

    # 🎭 **游戏场景设计更新任务**
    @task
    def game_scene_design_update_task(self) -> Task:
        return Task(
            config=self.tasks_config['game_scene_design_update_task'],
            output_file='game_data/environments_update.js'
        )

    # # 🎮 **游戏 UI 任务**
    # @task
    # def game_ui_design_task(self) -> Task:
    #     return Task(
    #         config=self.tasks_config['game_ui_design_task'],
    #         output_file='game_data/ui_design.txt'
    #     )


    # 🏗 **组建 Crew**
    @crew
    def crew(self) -> Crew:
        """Creates the RPG Game Development Crew"""
        return Crew(
            agents=self.agents,  # 自动创建代理
            tasks=self.tasks,  # 自动创建任务
            process=Process.sequential,  # 按顺序执行任务
            verbose=True
        )

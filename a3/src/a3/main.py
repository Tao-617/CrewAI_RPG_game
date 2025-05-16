#!/usr/bin/env python
import sys
import warnings

from datetime import datetime

from a3.crew import A3

warnings.filterwarnings("ignore", category=SyntaxWarning, module="pysbd")

# This main file is intended to be a way for you to run your
# crew locally, so refrain from adding unnecessary logic into this file.
# Replace with inputs you want to test with, it will automatically
# interpolate any tasks and agents information

def run():
    """
    Run the RPG game development crew.
    """
    inputs = {
        "game_title": "Mage Travel",
        "description":"a magic girl travel to different place and help the residents to fight against bad people",
        "storyline_path":"A4/data/storyline.md",
        "image_prompts_path":"A4/data/prompts.md",
        "game_style": "battle and magic",
        "dialog": "A4/javascripts/dialogData.js",
        "dialogCtrl": "A4/javascripts/dialogCtrl.js",
        "OriginDialogCtrl": "Origin/js/dialogCtrl.js",
        "Portrait": "A4/images/portrait",
        "character":"A4/data/character.md",
        "Weapons": "A4/images/weapons/",
        "Originplayer": "Origin/js/player.js",
        "player": "A4/javascripts/player.js",
        "background": "A4/images/backgrounds",
        "enemy":"A4/javascripts/enemy.js",
        "dialog_path": "A4/data/dialogData.js",
        "Originenemy": "Origin/js/player.js"
        
        "CodeBack": "A4/javascripts/background.js"
        "OriginCodeBack": "Origin/js/background.js"


        "DiaControl_path": "A4/data/dialogCtrl.js",
        "overwrite": True
    }
    try:
        A3().crew().kickoff(inputs=inputs)
    except Exception as e:
        raise Exception(f"An error occurred while running the crew: {e}")

def train():
    """
    Train the crew for a given number of iterations.
    """
    inputs = {
        "topic": "AI LLMs"
    }
    try:
        A3().crew().train(n_iterations=int(sys.argv[1]), filename=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while training the crew: {e}")

def replay():
    """
    Replay the crew execution from a specific task.
    """
    try:
        A3().crew().replay(task_id=sys.argv[1])

    except Exception as e:
        raise Exception(f"An error occurred while replaying the crew: {e}")

def test():
    """
    Test the crew execution and returns the results.
    """
    inputs = {
        "topic": "AI LLMs",
        "current_year": str(datetime.now().year)
    }
    try:
        A3().crew().test(n_iterations=int(sys.argv[1]), openai_model_name=sys.argv[2], inputs=inputs)

    except Exception as e:
        raise Exception(f"An error occurred while testing the crew: {e}")

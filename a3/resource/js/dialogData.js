const dialogScenes = {
    intro: [
        { speaker: 'hero', text: "Sage Lumina, I've come seeking your guidance." },
        { speaker: 'sageLumina', text: "Ah, the child of prophecy has arrived. I've been expecting you." },
        { speaker: 'hero', text: "You know who I am? How?" },
        { speaker: 'sageLumina', text: "The stars speak of your coming, young one. The birthmark on your hand... it glows with ancient power." },
        { speaker: 'hero', text: "This mark... it appeared when I defended my village. What does it mean?" },
        { speaker: 'sageLumina', text: "It means, dear child, that the fate of Luminaria rests upon your shoulders. Are you prepared for the journey ahead?" },
        { speaker: 'hero', text: "I... I'm not sure. But I know I must try. For the sake of my village, and all of Luminaria." },
        { speaker: 'sageLumina', text: "Then let us begin. The path before you is fraught with peril, but also with great promise." }
    ],
    meetAria: [
        { speaker: 'aria', text: "Hold it right there! Who dares to trespass in the Misty Mountains?" },
        { speaker: 'hero', text: "I mean no harm! I'm seeking a Sacred Relic to save Luminaria." },
        { speaker: 'aria', text: "Luminaria? Ha! Where was Luminaria when the shadow creatures took my sister?" },
        { speaker: 'hero', text: "Your sister? I'm so sorry. Perhaps... perhaps I could help you find her?" },
        { speaker: 'aria', text: "And why should I trust you, stranger?" },
        { speaker: 'hero', text: "Because I, too, know the pain of loss. And I believe that together, we stand a better chance against the darkness." },
        { speaker: 'aria', text: "...Fine. But know this - I'm watching you. One wrong move, and my arrow finds your heart." },
        { speaker: 'hero', text: "Understood. I'm honored to fight alongside you, Aria." }
    ],
    encounterZephyr: [
        { speaker: 'zephyr', text: "Well, well, what do we have here? Landlubbers lost in the Sunken Isles?" },
        { speaker: 'hero', text: "We seek the second Sacred Relic. Are you Zephyr, the sky pirate?" },
        { speaker: 'zephyr', text: "The one and only! And you're in luck, because I happen to have just the trinket you're looking for." },
        { speaker: 'aria', text: "Hand it over, pirate. We don't have time for games." },
        { speaker: 'zephyr', text: "Ooh, feisty! I like that. But I'm afraid nothing comes for free in these parts." },
        { speaker: 'hero', text: "Name your price, Zephyr. The fate of Luminaria hangs in the balance." },
        { speaker: 'zephyr', text: "How about... a little adventure? Help me with a 'job', and the relic is yours." },
        { speaker: 'hero', text: "We don't have much choice, do we? Very well, Zephyr. Lead the way." }
    ],
    midBattle: [
        { speaker: 'darkLord', text: "You dare to challenge me? You, a mere village child?" },
        { speaker: 'hero', text: "I am more than that now. I carry the hopes of all Luminaria!" },
        { speaker: 'darkLord', text: "Hope? Ha! Hope is for the weak. True power comes from embracing the darkness!" },
        { speaker: 'hero', text: "You're wrong. The strength I've found in my friends, in the people of this land... That is true power!" },
        { speaker: 'darkLord', text: "Foolish words. Let's see if your conviction can withstand this! ARISE, MY SHADOW LEGION!" }
    ],
    finalBattle: [
        { speaker: 'darkLord', text: "Impossible... How have you made it this far?" },
        { speaker: 'hero', text: "Because I don't fight alone. The spirit of Luminaria is with me!" },
        { speaker: 'darkLord', text: "Spirit? Pathetic. I wield the power of ancient darkness!" },
        { speaker: 'hero', text: "A darkness that has corrupted you. But it's not too late to turn back!" },
        { speaker: 'darkLord', text: "Turn back? Never! I am beyond redemption, beyond your petty morality!" },
        { speaker: 'hero', text: "Then you leave me no choice. With the power of the Sacred Relics, I will end this!" },
        { speaker: 'darkLord', text: "Come then, 'hero'. Let us see if your light can pierce my shadows!" },
        { speaker: 'hero', text: "For Luminaria, for my friends, for all that is good... I will not fail!" }
    ],
    lose: [
        { speaker: 'darkLord', text: "Hahahaha! Did you truly believe you could challenge me?" },
        { speaker: 'darkLord', text: "Your failure dooms all of Luminaria to eternal darkness. How delightful!" },
        { speaker: 'hero', text: "No... I can't... I won't let it end like this..." },
        { speaker: 'darkLord', text: "It's over, 'hero'. The darkness reigns supreme!" }
    ],
    win: [
        { speaker: 'hero', text: "It's done. The darkness... it's lifting." },
        { speaker: 'darkLord', text: "How... How could I lose to you?" },
        { speaker: 'hero', text: "Because light will always find a way to shine through the darkness." },
        { speaker: 'darkLord', text: "You fool... Do you think this changes anything? The darkness will always exist!" },
        { speaker: 'hero', text: "Yes, it will. But so will we, to face it. Together, we'll build a better Luminaria." },
        { speaker: 'sageLumina', text: "Well done, hero. You have fulfilled the prophecy and saved our realm." },
        { speaker: 'hero', text: "Thank you, Sage Lumina. But this victory belongs to all of us who fought for Luminaria." }
    ]
};
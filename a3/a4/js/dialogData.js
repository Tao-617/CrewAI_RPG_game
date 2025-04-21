 const dialogScenes = {
        verdantHeartlands: [
            { speaker: 'Godslayer', text: "Where... am I? This place feels familiar, yet so distant..." },
            { speaker: 'Lyra', text: "You have finally awakened, Godslayer. Ethoria has long awaited your return." },
            { speaker: 'Godslayer', text: "Godslayer? That name... it belongs to me, yet why does it feel so empty?" },
            { speaker: 'Lyra', text: "The past is fractured. The Void spreads its corruption. The gods are gone, and balance has been lost." },
            { speaker: 'Godslayer', text: "If the gods are gone, what am I supposed to do?" },
            { speaker: 'Lyra', text: "You have been chosen to find their scattered essence. To reclaim the light and push back the darkness." },
            { speaker: 'Godslayer', text: "Scattered essence? Where do I even begin to look?" },
            { speaker: 'Lyra', text: "The five primordial gods once shaped this world. Their essence lingers in the ruins of their domains—" },
            { speaker: 'Lyra', text: "Solaria, the remnants of the Light God’s domain, where the sun once bathed the golden temples in endless dawn." },
            { speaker: 'Lyra', text: "Umbra, the shrouded forests of the Shadow God, where the very darkness whispers secrets to those who listen." },
            { speaker: 'Lyra', text: "Thunderpeak Mountains, where the Storm God's wrath still echoes through the skies, striking down any who dare trespass." },
            { speaker: 'Lyra', text: "Earthheart Forge, the sacred workshop of the Earth God, now abandoned and cold, yet embers of its ancient power remain." },
            { speaker: 'Lyra', text: "Vitalia, the once-thriving domain of the Life God, now overtaken by decay, where nature itself struggles to survive." },
            { speaker: 'Lyra', text: "You must journey to these places and reclaim the fragments of divine power before the Void consumes them." },
            { speaker: 'Godslayer', text: "And if I refuse?" },
            { speaker: 'Lyra', text: "Then Ethoria will fall. The Void will consume all that remains." },
            { speaker: 'Godslayer', text: "...Then I don’t have a choice, do I?" }
        ],
        templeEternalDawn: [
            { speaker: 'Godslayer', text: "This temple... it's been abandoned for centuries." },
            { speaker: 'Lyra', text: "Once, this was the heart of Solaria’s power. Now, it is but a whisper of its former self." },
            { speaker: 'Godslayer', text: "And yet... I feel something. A presence." },
            { speaker: 'Lyra', text: "The essence of the Light God lingers here. Reach for it, but be warned—light can burn as easily as it can heal." },
            { speaker: 'Godslayer', text: "If this is what I need to fight the Void, then I will take it." },
            { speaker: 'Lyra', text: "Then prove your worth." },
            { speaker: 'Godslayer', text: "What do you mean?" },
            { speaker: 'Lyra', text: "The essence will not yield to the unworthy. Face the trial of light, and claim your power." }
        ],
        thunderpeakMountains: [
            { speaker: 'Karzak', text: "Stop right there. I've seen Voidspawn take many forms—why should I trust you?" },
            { speaker: 'Godslayer', text: "I’m not Void-touched. I’m here to fight against them." },
            { speaker: 'Karzak', text: "You wield divine essence. That’s no better. That’s what brought this ruin upon us in the first place." },
            { speaker: 'Godslayer', text: "Then what do you suggest? Let the Void consume everything?" },
            { speaker: 'Karzak', text: "...No. But I won’t follow someone who doesn’t understand the cost of power." },
            { speaker: 'Godslayer', text: "Then watch, and I’ll show you." }
        ],
        earthheartForge: [
            { speaker: 'Elara', text: "Fascinating! Your essence flows like liquid fire. Have you considered what that means?" },
            { speaker: 'Godslayer', text: "That I’m different?" },
            { speaker: 'Elara', text: "That you are power itself. And power should be refined." },
            { speaker: 'Karzak', text: "Careful. She loves power more than most." },
            { speaker: 'Elara', text: "Power is not evil, Karzak. It is merely a tool. And I can help you forge it into something greater, Godslayer." },
            { speaker: 'Godslayer', text: "At what cost?" },
            { speaker: 'Elara', text: "That, my dear, depends on how much you’re willing to pay." }
        ],
        whisperingWoods: [
            { speaker: 'Godslayer', text: "I hear them... voices, calling my name." },
            { speaker: 'Lyra', text: "The forest remembers all who pass through. Be careful not to lose yourself." },
            { speaker: 'Godslayer', text: "Who am I hearing?" },
            { speaker: 'Lyra', text: "Shadows of the past. The memories of the gods... and your own." },
            { speaker: 'Godslayer', text: "My own? What are you hiding from me, Lyra?" },
            { speaker: 'Lyra', text: "...The truth will reveal itself in time." }
        ],
        nightmareSpire: [
            { speaker: 'Malachar', text: "So, you finally arrived. Did you enjoy the lies they fed you?" },
            { speaker: 'Godslayer', text: "What lies?" },
            { speaker: 'Malachar', text: "That the gods were just? That their power could save you?" },
            { speaker: 'Godslayer', text: "If they were corrupt, then I will do what they could not—I will make things right!" },
            { speaker: 'Malachar', text: "Then come, ‘hero.’ Let’s see if your stolen divinity can match true power." }
        ],
        restoredGoldenCity: [
            { speaker: 'Lyra', text: "It is done. The Void retreats. But now, the choice remains." },
            { speaker: 'Godslayer', text: "Do I return the gods? Or do I claim this power for myself?" },
            { speaker: 'Karzak', text: "Be careful. You’ve seen what power does to those who wield it carelessly." },
            { speaker: 'Elara', text: "But think of what you could create." },
            { speaker: 'Godslayer', text: "...The choice is mine." }
        ],
        lose: [
            { speaker: 'Malachar', text: "And so falls the last hope of Ethoria. How utterly predictable." },
            { speaker: 'Malachar', text: "The Void will consume all, and from its depths, a new, perfect world will emerge." },
            { speaker: 'Godslayer', text: "No... Ethoria... I'm sorry... I wasn't... strong enough..." },
            { speaker: 'Malachar', text: "Hush now, and embrace the coming darkness. It's over, Godslayer. The Void reigns supreme." }
        ],

        win: [
            { speaker: 'Godslayer', text: "It's done. The Void... it's receding." },
            { speaker: 'Malachar', text: "Impossible... How could you overcome the power of the Void?" },
            { speaker: 'Godslayer', text: "Because I didn't fight alone. The essence of Ethoria itself stood with me." },
            { speaker: 'Malachar', text: "You fool... Do you think this changes anything? The cycle will begin anew!" },
            { speaker: 'Godslayer', text: "No, it won't. We've learned from the past, from your mistakes and the gods'. We'll do better." },
            { speaker: 'Lyra', text: "The prophecy is fulfilled, but your journey is far from over, Godslayer." },
            { speaker: 'Godslayer', text: "You're right, Lyra. This isn't an end, but a new beginning. For all of Ethoria." }
        ]

    } ;

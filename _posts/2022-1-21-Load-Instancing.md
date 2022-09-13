---
layout: post
title: Load Instancing
---

Ever wonder why summons seem to "fall asleep" when you run too far?

<video src="https://user-images.githubusercontent.com/12583972/150452361-50cff171-3ea2-43a6-aa63-4f68dfd15e07.mp4" autoplay loop></video>

It's not a bug. At least in the sense that it's not unintended.

In order to limit the resources used by the game, the game unloads things if you get too far away from them.

<video src="https://user-images.githubusercontent.com/12583972/150452064-5134c4aa-2edb-42a7-ae85-abf1d262d966.mp4" autoplay loop></video>

Calculating player movement, loading players' equipment sprites, receiving player action data from the server and calculating what they're doing - all that takes CPU. Keeping players' equipment sprites, backgrounds, enemy sprites, etc all takes memory too. From the perspective of the game, there's no point trying to load images and sprites, weapon swings, skill motions, etc if they're not going to be on screen anyway. So it makes a mental note to itself where the objects are, but nothing else. This applies to summons and monsters as well.

While something is unloaded, to the game client, it effectively doesn't exist. It won't interact with anything that's loaded (i.e. monsters can't be hit by attacks and summons won't hit monsters), and its icon (if applicable) disappears from the minimap. In the above gif you can see both the minimap dots for the other player and one NPC (Royal Knight) disappear while they are unloaded.

The "unloading" of player information manifests itself in some unusual ways.

<video src="https://user-images.githubusercontent.com/12583972/150452630-6c61858a-6881-4f43-8f12-d2d55f9c59ae.mp4" autoplay loop></video>

Here, while the Dual Blade is out of my load instance, his damage skin is forgotten, and his Arcane Force is forgotten too; the "not enough AF" effect shows up on the monsters he hits. The damage skin thing even applies to different lines under the same hit, indicating that damage skins are rendered line-by-line rather than per-attack, which is interesting.

Note that loading and unloading strictly a distance-from-object thing. Parts of maps get loaded and unloaded in chunks. You'll see below that the NPC and the player both get unloaded and reloaded at the same time, despite the fact that they're not in exactly the same spot.

<video src="https://user-images.githubusercontent.com/12583972/150451957-c66b1d2b-4085-4e12-a453-1e5e1ec0882f.mp4" autoplay loop></video>

It's also possible to see that the distance at which the objects are re-loaded is different from the distance at which they are unloaded, and generally you need to get closer to re-load something than the distance to unload it. So there are "load boundaries" hidden throughout the map that inform the game when to unload and reload things so that someone moving through the map at an average speed doesn't feel the reloading and unloading, and the game saves resources by not having to keep up with everything all the time.

Also note that load instance boundaries aren't a constant thing, either. Each map has its own individual load instance boundaries. Some maps, for example, are all purely one load instance and the game never unloads anything:

<video src="https://user-images.githubusercontent.com/12583972/150456753-72733b09-6d83-4d35-9e63-9428b2a3416d.mp4" autoplay loop></video>

You can see that the Shadower never gets unloaded because his dot is on the minimap even from way across the map, and the Dark Flare never gets unsummoned, either.

For obvious reasons most boss fight maps are a single load instance, but for field maps they're pretty inconsistent. As far as I know only the Torrent maps are odd in that they force everything into one load instance.

## Load instancing and Summons

The most practical use-case for knowledge about load instancing is of course summons. People often place their summons at edges of maps to attempt to get full map coverage, but this might not necessarily be optimal because summons might get unloaded if they're on one side and the player goes to the other. So let's take a closer look at how load instancing interacts with summons and monsters.

While a summon is outside of a player's load instance, it's desummoned and stops attacking. But if the player gets close enough to go back into its load instance, the summon re-summons itself and continues attacking.

Some might think that the take-home lesson from this is "only stay in small maps where summons never get unloaded". Well, not wrong, but there's more nuance to that as well.

One thing about monsters: this may seem unintuitive, but monster position and monster behaviour is client-sided. Your client controls whether monsters choose to walk left or walk right or attack, sends that to the server, the server verifies it / syncs it with other people in the map. Monster data has its AI (movement behaviour; whether it's a flying monster, walking monster, jumping monster, or an auto-aggro monster, etc.) is in the game data. Historically it was possible to edit game data to make all monsters move into one spot for easy killing; this was known as "soft-vac".

Because monsters are client-sided, by extension, if the monsters are unloaded, this means they can't be killed.

<video src="https://user-images.githubusercontent.com/12583972/150456474-ff8fefd1-fb2d-4588-9379-34e9fe4ba89c.mp4" autoplay loop> </video>

In this situation, the Shadower is on the ground floor. The Dark Flare is 2 levels above, and is within the Shadower's load instance; you can see it is very much awake and hitting things. But it refuses to hit the monsters on the slightly higher platform to the left; because the Shadower unloaded them, and didn't get close enough to reload them. To the Shadower, those monsters don't exist. The summon belongs to the Shadower, and hence the summon won't kill them. In order for those to be killed the Shadower has to move a bit to re-load them.

Even in small maps monsters can get unloaded if you hug the wall (e.g. when looting items). So the real take-home is that no matter what map you're on you should regularly move around the map to ensure that all monsters are being re-loaded.

When load instancing is studied using multiple accounts in the same map, things get weird quite quickly.

For example, in the following scenario, a Shadower planted Dark Flare then moved out of the Kanna's load instance.

<video src="/assets/MapleStory_W99hjhgBr0.mp4" autoplay loop> </video>

Since the Shadower is unloaded, the Kanna doesn't see him on her minimap. Because the Dark Flare belongs to the shadower, the Dark Flare is unloaded too, and she can't see that either. But because the Dark Flare (and the monsters) are in the Shadower's load instance, the Shadower's client is still dealing damage and killing the monsters. The monsters dying is registered in the server and sent to the Kanna's client and shown. But the hit damage and summon's presence is not.
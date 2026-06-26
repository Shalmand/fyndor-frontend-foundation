import { lore, p } from "@/components/reading/ChapterContent";
import type { Chapter } from "@/components/reading/types";

/**
 * Mock chapter content for the Reading Experience showcase.
 *
 * Two consecutive chapters of "Ash & Atlas" — enough to demonstrate
 * the chapter transition AND continuous-reading append behaviour.
 *
 * Inline `lore("word", "lore-id")` tokens mark future Story World
 * references. They render as plain prose today; a future
 * LoreReferenceProvider will activate them as interactive references.
 */

const chapterOne: Chapter = {
  id: "ch_ash_01",
  storyId: "s_ash_and_atlas",
  index: 1,
  title: "The Burned Map",
  readingMinutes: 9,
  words: 2210,
  nextChapterId: "ch_ash_02",
  blocks: [
    p(
      "The fire took the western coast first — which was, as far as ",
      lore("Eda", "char-eda-mercer"),
      " was concerned, the only part of the map that had ever mattered.",
    ),
    p(
      "She watched the parchment curl from the edges in, the way a leaf gives up in autumn. The ink she had ground herself, from oak galls and rainwater and the patience of three winters, climbed into the air as black smoke and was gone. There was, she thought distantly, a kind of mercy in that.",
    ),
    p(
      "Behind her, the door of the ",
      lore("Silverquill Atelier", "loc-silverquill-atelier"),
      " was still open to the street. No one had come running. No one ever did, in this district, at this hour. The bell-towers were tolling Second Watch and the only sound louder than the fire was her own breath, very slow, very even, the way her mother had taught her to breathe when she was about to lie to a stranger.",
    ),
    p(
      "The map finished burning at the same moment the last bell finished ringing. Eda took this as a sign, although she did not yet know of what.",
    ),
    { type: "scene-break" },
    {
      type: "blockquote",
      text: "A cartographer who burns her own map has either lost her mind or found a better one. There is, of course, a third option, which is that she has lost the world.",
      attribution: "Marginalia in the second Mercer atlas, anonymous",
    },
    p(
      "By the time the city's grey morning seeped under the shutters, she had swept the ashes into a tin and labelled the tin in her neat, contemptuous hand: ",
      lore("WESTERN COAST, FIRST DRAFT", "doc-western-coast-draft"),
      ". She put the tin on the shelf where the map had lived, between the unfinished survey of the ",
      lore("Hollow Reaches", "loc-hollow-reaches"),
      " and a jar of pins. It looked, she decided, exactly as wrong as it should.",
    ),
    p(
      "Then she opened the trunk under the window and took out the diaries. Twelve of them, leather-bound, tied with the kind of waxed cord one only buys for things one means to keep. She had sworn, at twenty-two, that she would never read a word of them. She was thirty-one now, and the western coast was gone, and she had nothing else.",
    ),
    p(
      "She lit a candle, although it was already light. She sat down. She untied the first cord.",
    ),
    p("She began to read.")
  ],
  authorNote: {
    body:
      "A quieter opening than I usually write — Eda needed to enter on her own breath, not on a chase. The bell motif from the prologue returns here on purpose. The diaries will not be kind to her.",
  },
  comments: [
    {
      id: "c_r_001",
      author: "Amara Solène",
      body: "The scene with the burned map. I had to put the phone down. That was a whole grief in three paragraphs.",
      likes: 412,
    },
    {
      id: "c_r_002",
      author: "Juno Marsh",
      body: "“She lit a candle, although it was already light.” I will be thinking about that line for a week.",
      likes: 188,
    },
    {
      id: "c_r_003",
      author: "Theodor Lyne",
      body: "The contempt in her handwriting — described in one word — is the most Eda thing in the book so far.",
      likes: 96,
    },
  ],
};

const chapterTwo: Chapter = {
  id: "ch_ash_02",
  storyId: "s_ash_and_atlas",
  index: 2,
  title: "What the Diaries Knew",
  readingMinutes: 11,
  words: 2680,
  nextChapterId: null,
  blocks: [
    p(
      "The first diary opened on a Tuesday in late spring, eleven years ago, in handwriting that had once been hers and was no longer.",
    ),
    p(
      "Walked the cliff road to ",
      lore("Briar Point", "loc-briar-point"),
      " with M. He was kinder than I deserved, which is the only kind of kindness I trust. He drew the coastline in the sand with a stick and said: this is yours now, Eda. Do not lose it.",
    ),
    p(
      "She closed the book on her thumb, carefully, the way one closes a door on a sleeping child. She had not lost it. She had burned it.",
    ),
    { type: "scene-break" },
    p(
      "There is a particular quiet to a workshop at the hour between night and morning, when the lamps have gone out and the street has not yet woken. Eda had spent most of her adult life inside it. She found, this morning, that she did not recognize it at all.",
    ),
    p(
      "The shelves were the same shelves. The pins were the same pins. The jar of ground oak gall stood where it had stood for nine years, beside the brass weight her father had given her on the day she was named ",
      lore("Master of Silverquill", "concept-silverquill-mastery"),
      ". And yet the room had the air of a house that had been entered, very politely, by someone who did not intend to leave.",
    ),
    p(
      "She poured tea she did not drink. She opened the second diary.",
    ),
  ],
  comments: [
    {
      id: "c_r_004",
      author: "Iris Vale",
      body: "Reading these two chapters back to back is going to ruin people. The pacing is perfect.",
      likes: 274,
    },
    {
      id: "c_r_005",
      author: "Kenji Okafor",
      body: "“the way one closes a door on a sleeping child” — this is the line, this is the whole book in one image.",
      likes: 132,
    },
  ],
};

export const mockChapters: Record<string, Chapter> = {
  [chapterOne.id]: chapterOne,
  [chapterTwo.id]: chapterTwo,
};

export const firstChapterId = chapterOne.id;

export function getMockChapter(id: string): Chapter | undefined {
  return mockChapters[id];
}

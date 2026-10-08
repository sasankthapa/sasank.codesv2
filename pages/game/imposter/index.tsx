import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { FaArrowUp, FaPlus, FaTimes, FaUserSecret, FaRedo, FaChevronDown, FaPlay, FaUsers } from 'react-icons/fa'
import { DEFAULT_IMPOSTER_WORDS, ImposterWord } from '../../../lib/imposterWords'

const PLAYERS_KEY = 'imposter.players'
const WORDS_KEY = 'imposter.words'
const USED_KEY = 'imposter.usedWords'
const MIN_PLAYERS = 3

type Phase = 'setup' | 'reveal' | 'play'

type Round = {
  word: ImposterWord
  imposter: number
  starter: number
}

function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage full or blocked; game still works for this session
  }
}

const randomInt = (max: number) => Math.floor(Math.random() * max)

// Picks a word not used recently; once every word has been played the
// history resets so the list cycles.
function pickWord(words: ImposterWord[]): ImposterWord {
  const used = new Set(readStorage<string[]>(USED_KEY, []))
  let pool = words.filter((w) => !used.has(w.word))
  if (pool.length === 0) {
    used.clear()
    pool = words
  }
  const word = pool[randomInt(pool.length)]
  used.add(word.word)
  writeStorage(USED_KEY, Array.from(used))
  return word
}

const ImposterGame: NextPage = () => {
  const [loaded, setLoaded] = useState(false)
  const [players, setPlayers] = useState<string[]>([])
  const [words, setWords] = useState<ImposterWord[]>(DEFAULT_IMPOSTER_WORDS)
  const [phase, setPhase] = useState<Phase>('setup')
  const [round, setRound] = useState<Round | null>(null)
  const [current, setCurrent] = useState(0)
  const [hasPeeked, setHasPeeked] = useState(false)
  const [showAnswer, setShowAnswer] = useState(false)

  // localStorage is only available client side, so hydrate after mount.
  useEffect(() => {
    setPlayers(readStorage<string[]>(PLAYERS_KEY, []))
    const storedWords = readStorage<ImposterWord[] | null>(WORDS_KEY, null)
    if (storedWords && storedWords.length > 0) setWords(storedWords)
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) writeStorage(PLAYERS_KEY, players)
  }, [players, loaded])

  useEffect(() => {
    if (loaded) writeStorage(WORDS_KEY, words)
  }, [words, loaded])

  const startRound = () => {
    if (players.length < MIN_PLAYERS || words.length === 0) return
    setRound({
      word: pickWord(words),
      imposter: randomInt(players.length),
      starter: randomInt(players.length),
    })
    setCurrent(0)
    setHasPeeked(false)
    setShowAnswer(false)
    setPhase('reveal')
  }

  const nextPlayer = () => {
    if (current + 1 >= players.length) {
      setPhase('play')
    } else {
      setCurrent(current + 1)
      setHasPeeked(false)
    }
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-inter">
      <Head>
        <title>Imposter</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover" />
        <meta name="description" content="Pass-and-play imposter word game" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
        <header className="flex items-center justify-between py-2">
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <FaUserSecret className="text-pink-400" />
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Imposter</span>
          </h1>
          {phase !== 'setup' && (
            <button
              onClick={() => setPhase('setup')}
              className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 active:bg-white/10"
            >
              <FaUsers /> Setup
            </button>
          )}
        </header>

        {phase === 'setup' && (
          <Setup
            players={players}
            setPlayers={setPlayers}
            words={words}
            setWords={setWords}
            onStart={startRound}
          />
        )}

        {phase === 'reveal' && round && (
          <div className="flex flex-1 flex-col">
            <p className="mb-3 text-center text-sm text-white/50">
              Player {current + 1} of {players.length}
            </p>
            <RevealCard
              key={current}
              name={players[current]}
              isImposter={current === round.imposter}
              word={round.word}
              onPeek={() => setHasPeeked(true)}
            />
            <button
              onClick={nextPlayer}
              disabled={!hasPeeked}
              className="mt-4 w-full rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-lg font-semibold shadow-lg transition-opacity disabled:opacity-30"
            >
              {current + 1 >= players.length ? 'Everyone has seen it' : `Next: ${players[current + 1]}`}
            </button>
          </div>
        )}

        {phase === 'play' && round && (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-widest text-white/50">Starting player</p>
              <p className="mt-2 break-words text-4xl font-bold text-pink-300">{players[round.starter]}</p>
              <p className="mt-4 text-sm text-white/60">
                Go around giving one-word clues. Then vote on who the imposter is.
              </p>
            </div>

            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              {showAnswer ? (
                <div className="space-y-2">
                  <p className="text-sm text-white/50">The imposter was</p>
                  <p className="break-words text-3xl font-bold text-red-400">{players[round.imposter]}</p>
                  <p className="pt-2 text-sm text-white/50">The word was</p>
                  <p className="break-words text-2xl font-semibold">{round.word.word}</p>
                </div>
              ) : (
                <button onClick={() => setShowAnswer(true)} className="w-full py-2 text-lg font-semibold text-purple-200">
                  Reveal imposter
                </button>
              )}
            </div>

            <button
              onClick={startRound}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-lg font-semibold shadow-lg"
            >
              <FaRedo /> Next round
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

type SetupProps = {
  players: string[]
  setPlayers: (p: string[]) => void
  words: ImposterWord[]
  setWords: (w: ImposterWord[]) => void
  onStart: () => void
}

function Setup({ players, setPlayers, words, setWords, onStart }: SetupProps) {
  const [name, setName] = useState('')
  const [newWord, setNewWord] = useState('')
  const [newHint, setNewHint] = useState('')
  const [wordsOpen, setWordsOpen] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)

  const addPlayer = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed || players.some((p) => p.toLowerCase() === trimmed.toLowerCase())) return
    setPlayers([...players, trimmed])
    setName('')
  }

  const addWord = (e: React.FormEvent) => {
    e.preventDefault()
    const word = newWord.trim()
    const hint = newHint.trim()
    if (!word || !hint || words.some((w) => w.word.toLowerCase() === word.toLowerCase())) return
    setWords([{ word, hint }, ...words])
    setNewWord('')
    setNewHint('')
  }

  const resetWords = () => {
    if (!confirmReset) {
      setConfirmReset(true)
      return
    }
    setWords(DEFAULT_IMPOSTER_WORDS)
    setConfirmReset(false)
  }

  const canStart = players.length >= MIN_PLAYERS && words.length > 0
  const inputClass =
    'min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder-white/30 outline-none focus:border-purple-400'

  return (
    <div className="flex flex-1 flex-col gap-4 pt-2">
      <section className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
        <h2 className="mb-3 text-lg font-semibold">Players</h2>
        <form onSubmit={addPlayer} className="flex gap-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Add player name"
            maxLength={24}
            autoComplete="off"
            className={inputClass}
          />
          <button
            type="submit"
            aria-label="Add player"
            className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 px-4 active:opacity-80"
          >
            <FaPlus />
          </button>
        </form>
        {players.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {players.map((p, i) => (
              <li key={p} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 py-1.5 pl-3 pr-1.5">
                <span className="max-w-[10rem] truncate">{p}</span>
                <button
                  onClick={() => setPlayers(players.filter((_, j) => j !== i))}
                  aria-label={`Remove ${p}`}
                  className="rounded-full p-1 text-white/50 active:bg-white/10"
                >
                  <FaTimes size={12} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-white/40">No players yet.</p>
        )}
        {players.length > 0 && players.length < MIN_PLAYERS && (
          <p className="mt-3 text-sm text-pink-300/80">Add at least {MIN_PLAYERS} players.</p>
        )}
      </section>

      <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
        <button
          onClick={() => setWordsOpen(!wordsOpen)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <span className="text-lg font-semibold">
            Word list <span className="text-sm font-normal text-white/40">({words.length})</span>
          </span>
          <FaChevronDown className={`text-white/50 transition-transform ${wordsOpen ? 'rotate-180' : ''}`} />
        </button>
        <div className={wordsOpen ? 'grid grid-rows-[1fr] transition-all duration-500' : 'grid grid-rows-[0fr]'}>
          <div className="min-h-0 overflow-hidden">
            <div className="px-4 pb-4">
              <form onSubmit={addWord} className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="Word"
                    autoComplete="off"
                    className={inputClass}
                  />
                  <input
                    value={newHint}
                    onChange={(e) => setNewHint(e.target.value)}
                    placeholder="Imposter hint"
                    autoComplete="off"
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 py-2.5 active:bg-white/20"
                >
                  <FaPlus size={12} /> Add word
                </button>
              </form>
              <ul className="mt-3 max-h-72 divide-y divide-white/5 overflow-y-auto rounded-xl border border-white/10">
                {words.map((w, i) => (
                  <li key={w.word} className="flex items-center justify-between gap-2 px-3 py-2">
                    <span className="min-w-0 truncate">
                      {w.word} <span className="text-sm text-white/40">· {w.hint}</span>
                    </span>
                    <button
                      onClick={() => setWords(words.filter((_, j) => j !== i))}
                      aria-label={`Remove ${w.word}`}
                      className="shrink-0 rounded-full p-1.5 text-white/40 active:bg-white/10"
                    >
                      <FaTimes size={12} />
                    </button>
                  </li>
                ))}
              </ul>
              <button
                onClick={resetWords}
                onBlur={() => setConfirmReset(false)}
                className="mt-3 w-full text-sm text-white/50 underline-offset-2 active:underline"
              >
                {confirmReset ? 'Tap again to replace your list with defaults' : 'Reset to default words'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-auto pt-2">
        <button
          onClick={onStart}
          disabled={!canStart}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 py-4 text-lg font-semibold shadow-lg transition-opacity disabled:opacity-30"
        >
          <FaPlay size={14} /> Start round
        </button>
      </div>
    </div>
  )
}

type RevealCardProps = {
  name: string
  isImposter: boolean
  word: ImposterWord
  onPeek: () => void
}

// A cover card the player drags upward to peek at their secret underneath.
// Letting go snaps it back down so the next player can't see it.
function RevealCard({ name, isImposter, word, onPeek }: RevealCardProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const startY = useRef<number | null>(null)
  const [offset, setOffset] = useState(0)
  const [dragging, setDragging] = useState(false)

  const maxDrag = () => (containerRef.current?.clientHeight ?? 400) * 0.7

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    startY.current = e.clientY
    setDragging(true)
  }

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startY.current === null) return
    const dy = Math.min(0, e.clientY - startY.current)
    const clamped = Math.max(-maxDrag(), dy)
    setOffset(clamped)
    if (clamped < -maxDrag() * 0.5) onPeek()
  }

  const release = () => {
    startY.current = null
    setDragging(false)
    setOffset(0)
  }

  return (
    <div
      ref={containerRef}
      className="relative flex-1 select-none overflow-hidden rounded-3xl border border-white/10 bg-slate-950/60"
      style={{ minHeight: '22rem' }}
    >
      <div className="absolute inset-x-0 bottom-0 flex h-[70%] flex-col items-center justify-center px-6 text-center">
        {isImposter ? (
          <>
            <FaUserSecret className="mb-3 text-5xl text-red-400" />
            <p className="text-3xl font-extrabold uppercase tracking-wide text-red-400">Imposter</p>
            <p className="mt-4 text-sm uppercase tracking-widest text-white/50">Your hint</p>
            <p className="mt-1 break-words text-2xl font-semibold">{word.hint}</p>
          </>
        ) : (
          <>
            <p className="text-sm uppercase tracking-widest text-white/50">The word is</p>
            <p className="mt-2 break-words text-4xl font-extrabold text-purple-200">{word.word}</p>
          </>
        )}
      </div>

      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={release}
        onPointerCancel={release}
        className={`absolute inset-0 flex cursor-grab touch-none flex-col items-center justify-between rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 shadow-2xl ${
          dragging ? '' : 'transition-transform duration-300 ease-out'
        }`}
        style={{ transform: `translateY(${offset}px)` }}
      >
        <div />
        <div className="text-center">
          <p className="text-sm uppercase tracking-widest text-white/70">Pass the phone to</p>
          <p className="mt-2 break-words text-5xl font-extrabold">{name}</p>
        </div>
        <div className="flex flex-col items-center gap-2 text-white/80">
          <FaArrowUp className="animate-bounce text-2xl" />
          <p className="text-sm">Drag up to reveal</p>
        </div>
      </div>
    </div>
  )
}

export default ImposterGame

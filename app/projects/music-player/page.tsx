"use client"

import { useState, useEffect } from "react"
import YouTube, { type YouTubeProps } from "react-youtube"
import { Play, Pause, SkipForward, SkipBack, Share2, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

// Bangladeshi artists and their popular songs
const musicData = {
  "Minar Rahman": [
    { id: "aOlSRLuzqJU", title: "Shada Kalo", artist: "Minar Rahman" },
    { id: "F6LSwCTGFLs", title: "Eka Eka", artist: "Minar Rahman" },
    { id: "kYKARtukTjk", title: "Shada Ronger Shopno", artist: "Minar Rahman" },
  ],
  Tahsan: [
    { id: "7-J4RNaUNy8", title: "Kothao Keu Nei", artist: "Tahsan" },
    { id: "rqANeSPe_yA", title: "Irsha", artist: "Tahsan" },
    { id: "mR2VifNd-_E", title: "Dariye Acho Tumi", artist: "Tahsan" },
  ],
  "Habib Wahid": [
    { id: "T94PHkuydcw", title: "Krishno", artist: "Habib Wahid" },
    { id: "RuvnelPvwu4", title: "Shono", artist: "Habib Wahid" },
    { id: "Bhuiyan", title: "Bhuiyan", artist: "Habib Wahid" },
  ],
  Shironamhin: [
    { id: "WHlVU4rOELs", title: "Hashimukh", artist: "Shironamhin" },
    { id: "F_jCCaD2kl0", title: "Ei Obelay", artist: "Shironamhin" },
    { id: "rP4wzwqsKzU", title: "Jahaji", artist: "Shironamhin" },
  ],
  Artcell: [
    { id: "WHlVU4rOELs", title: "Oniket Prantor", artist: "Artcell" },
    { id: "rP4wzwqsKzU", title: "Dukkho Bilash", artist: "Artcell" },
    { id: "F_jCCaD2kl0", title: "Rahur Grash", artist: "Artcell" },
  ],
  Avash: [
    { id: "mR2VifNd-_E", title: "Tomar Jonno", artist: "Avash" },
    { id: "7-J4RNaUNy8", title: "Bhalobashar Morshum", artist: "Avash" },
    { id: "rqANeSPe_yA", title: "Shopner Thikana", artist: "Avash" },
  ],
}

interface Song {
  id: string
  title: string
  artist: string
}

export default function MusicPlayer() {
  const [selectedArtist, setSelectedArtist] = useState<string>("Minar Rahman")
  const [currentSong, setCurrentSong] = useState<Song | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [player, setPlayer] = useState<any>(null)
  const [backgroundImage, setBackgroundImage] = useState("")

  const artists = Object.keys(musicData)
  const currentPlaylist = musicData[selectedArtist as keyof typeof musicData] || []

  useEffect(() => {
    if (currentPlaylist.length > 0) {
      setCurrentSong(currentPlaylist[0])
      setCurrentIndex(0)
    }
  }, [selectedArtist])

  useEffect(() => {
    if (currentSong) {
      setBackgroundImage(`https://img.youtube.com/vi/${currentSong.id}/maxresdefault.jpg`)
    }
  }, [currentSong])

  const onReady: YouTubeProps["onReady"] = (event) => {
    setPlayer(event.target)
  }

  const onEnd = () => {
    playNext()
  }

  const onStateChange: YouTubeProps["onStateChange"] = (event) => {
    setIsPlaying(event.data === 1)
  }

  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo()
      } else {
        player.playVideo()
      }
    }
  }

  const playNext = () => {
    const nextIndex = (currentIndex + 1) % currentPlaylist.length
    setCurrentIndex(nextIndex)
    setCurrentSong(currentPlaylist[nextIndex])
  }

  const playPrevious = () => {
    const prevIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    setCurrentSong(currentPlaylist[prevIndex])
  }

  const selectSong = (song: Song, index: number) => {
    setCurrentSong(song)
    setCurrentIndex(index)
  }

  const shareCurrentSong = async () => {
    if (currentSong) {
      const shareData = {
        title: `${currentSong.title} - ${currentSong.artist}`,
        text: `Check out this amazing song by ${currentSong.artist}!`,
        url: `https://youtube.com/watch?v=${currentSong.id}`,
      }

      if (navigator.share) {
        try {
          await navigator.share(shareData)
        } catch (err) {
          console.log("Error sharing:", err)
        }
      } else {
        // Fallback to clipboard
        navigator.clipboard.writeText(shareData.url)
        alert("Link copied to clipboard!")
      }
    }
  }

  const opts: YouTubeProps["opts"] = {
    height: "0",
    width: "0",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      rel: 0,
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Background Image with Blur */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-20 blur-3xl scale-110"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-purple-900/30 to-violet-900/50" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Bangladeshi Music Player
          </h1>
          <p className="text-gray-300 text-lg">Discover the best of Bangladeshi music</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Artist Filter */}
          <div className="lg:col-span-1">
            <Card className="bg-black/20 backdrop-blur-md border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  Artists
                </h2>
                <div className="space-y-2">
                  {artists.map((artist) => (
                    <button
                      key={artist}
                      onClick={() => setSelectedArtist(artist)}
                      className={cn(
                        "w-full text-left p-3 rounded-lg transition-all duration-200",
                        selectedArtist === artist
                          ? "bg-purple-600/50 text-white shadow-lg shadow-purple-500/25"
                          : "text-gray-300 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      {artist}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Now Playing */}
            {currentSong && (
              <Card className="bg-black/20 backdrop-blur-md border-white/10">
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative">
                      <img
                        src={`https://img.youtube.com/vi/${currentSong.id}/hqdefault.jpg`}
                        alt={currentSong.title}
                        className="w-32 h-32 rounded-xl shadow-2xl shadow-purple-500/25"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                      <Badge className="mb-2 bg-purple-600/20 text-purple-300 border-purple-500/30">Now Playing</Badge>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{currentSong.title}</h3>
                      <p className="text-gray-300 text-lg mb-4">{currentSong.artist}</p>

                      {/* Controls */}
                      <div className="flex items-center justify-center md:justify-start gap-4">
                        <Button
                          onClick={playPrevious}
                          size="lg"
                          variant="ghost"
                          className="text-white hover:bg-white/10 hover:text-purple-300"
                        >
                          <SkipBack className="w-6 h-6" />
                        </Button>

                        <Button
                          onClick={togglePlayPause}
                          size="lg"
                          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg shadow-purple-500/25 w-16 h-16 rounded-full"
                        >
                          {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
                        </Button>

                        <Button
                          onClick={playNext}
                          size="lg"
                          variant="ghost"
                          className="text-white hover:bg-white/10 hover:text-purple-300"
                        >
                          <SkipForward className="w-6 h-6" />
                        </Button>

                        <Button
                          onClick={shareCurrentSong}
                          size="lg"
                          variant="ghost"
                          className="text-white hover:bg-white/10 hover:text-purple-300"
                        >
                          <Share2 className="w-6 h-6" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Playlist */}
            <Card className="bg-black/20 backdrop-blur-md border-white/10">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">{selectedArtist} - Playlist</h2>
                <div className="space-y-2">
                  {currentPlaylist.map((song, index) => (
                    <button
                      key={`${song.id}-${index}`}
                      onClick={() => selectSong(song, index)}
                      className={cn(
                        "w-full text-left p-4 rounded-lg transition-all duration-200 flex items-center gap-4",
                        currentSong?.id === song.id
                          ? "bg-purple-600/30 text-white shadow-lg shadow-purple-500/25"
                          : "text-gray-300 hover:bg-white/10 hover:text-white",
                      )}
                    >
                      <img
                        src={`https://img.youtube.com/vi/${song.id}/default.jpg`}
                        alt={song.title}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{song.title}</h4>
                        <p className="text-sm opacity-70">{song.artist}</p>
                      </div>
                      {currentSong?.id === song.id && isPlaying && (
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse" />
                          <div className="w-1 h-6 bg-purple-400 rounded-full animate-pulse delay-75" />
                          <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse delay-150" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hidden YouTube Player */}
        {currentSong && (
          <div className="hidden">
            <YouTube
              videoId={currentSong.id}
              opts={opts}
              onReady={onReady}
              onEnd={onEnd}
              onStateChange={onStateChange}
            />
          </div>
        )}
      </div>

      {/* Floating Play Button for Mobile */}
      {currentSong && (
        <div className="fixed bottom-6 right-6 md:hidden z-50">
          <Button
            onClick={togglePlayPause}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl shadow-purple-500/50 w-16 h-16 rounded-full animate-pulse"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </Button>
        </div>
      )}
    </div>
  )
}

import {
  ButtonPlayer,
  ButtonsContent,
  ContainerMusic,
  ContainerName,
  ContainerPlay,
  ContainerSeek,
} from "./styles";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, SkipBack, SkipForward } from "phosphor-react";
import { playlist } from "./musics";

export const AudioPlayer = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0); // controla qual música está sendo tocada
  const [progress, setProgress] = useState(0); // porcentagem da música já tocada
  const [isPlaying, setIsPlaying] = useState(false); // se a música está tocando ou não
  const lastClickRef = useRef<number | null>(null); // usado para detectar clique duplo

  const currentTrack = playlist[currentTrackIndex]; // pega a música atual baseada no índice
  const audioRef = useRef<HTMLAudioElement | null>(null); // referência para o elemento de áudio

  // função de tocar ou pausar a música
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause(); // pausa se já estiver tocando
    } else {
      audio.play(); // toca se estiver pausado
    }
    setIsPlaying(!isPlaying); // alterna o estado
  };

  // permite clicar na barra de progresso para avançar/retroceder
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio) return;

    const rect = e.currentTarget.getBoundingClientRect(); // posição da barra na tela
    const clickX = e.clientX - rect.left; // onde o clique ocorreu
    const width = rect.width; // largura da barra
    const newTime = (clickX / width) * audio.duration; // calcula a nova posição da música
    audio.currentTime = newTime; // altera o tempo atual da música
  };

  // função para reiniciar ou voltar para a música anterior
  const handleRestartOrPrevious = () => {
    const now = Date.now();

    if (lastClickRef.current && now - lastClickRef.current < 300) {
      // se for um clique duplo: vai para a música anterior
      setCurrentTrackIndex((prev) =>
        prev === 0 ? playlist.length - 1 : prev - 1
      );
      setProgress(0);
    } else {
      // se for clique único: reinicia a música
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
      setProgress(0);
    }

    lastClickRef.current = now; // atualiza o último clique
  };

  // avança para a próxima música da playlist
  const handlePlayNext = () => {
    setCurrentTrackIndex((prev) =>
      prev === playlist.length - 1 ? 0 : prev + 1
    );
    setProgress(0);
  };

  // atualiza a barra de progresso conforme a música toca
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const duration = audio.duration; // duração total da música
      const currentTime = audio.currentTime; // tempo atual da música
      const percentage = (currentTime / duration) * 100; // porcentagem tocada
      setProgress(percentage); // atualiza o estado do progresso
    };

    audio.addEventListener("timeupdate", updateProgress); // atualiza sempre que o tempo mudar

    return () => {
      audio.removeEventListener("timeupdate", updateProgress); // remove o evento ao desmontar
    };
  }, []);

  // quando a música for trocada, já começa tocando
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.load(); // carrega a nova música
      audio.play(); // começa a tocar
      setIsPlaying(true); // atualiza o estado
    }
  }, [currentTrackIndex]);

  return (
    <ContainerMusic>
      <img src={currentTrack.cover} alt={`Capa da música ${currentTrack.title}`} />
      <ContainerName>
        <h1>{currentTrack.title}</h1>
        <p>{currentTrack.artist}</p>
      </ContainerName>

      <ContainerPlay>
        {/* barra de progresso clicável */}
        <ContainerSeek $progress={progress} onClick={handleSeek}>
          <div />
        </ContainerSeek>

        {/* elemento de áudio real */}
        <audio ref={audioRef}>
          <source src={currentTrack.src} type="audio/mpeg" />
        </audio>

        {/* botões de controle */}
        <ButtonsContent>
          <button
            className="main-button"
            type="button"
            onClick={handleRestartOrPrevious}
          >
            <SkipBack size={20} weight="fill" />
          </button>

          <ButtonPlayer type="button" onClick={togglePlay}>
            {isPlaying ? (
              <Pause size={18} weight="fill" />
            ) : (
              <Play size={18} weight="fill" />
            )}
          </ButtonPlayer>

          <button
            className="main-button"
            type="button"
            onClick={handlePlayNext}
          >
            <SkipForward size={20} weight="fill" />
          </button>
        </ButtonsContent>
      </ContainerPlay>
    </ContainerMusic>
  );
};

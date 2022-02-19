
const audioOK = new Audio(require('@/assets/sounds/casino-win-pattern-21-sound-effect-24441529.mp3'))
const audioKO = new Audio(require('@/assets/sounds/incorrect-answer--5-sound-effect-20379639.mp3'))

const getPokemonSounds = (sound) => {
    switch (sound) {
        case 'OK':
            audioOK.play();
            break;

        case 'KO':
            audioKO.play();
            break;
    
        default:
            break;
    }

    return true;
}

export default getPokemonSounds
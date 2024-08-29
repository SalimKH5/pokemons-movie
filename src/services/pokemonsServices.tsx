import { useIonRouter } from "@ionic/react";

const router = useIonRouter();

function prePokemon(id: number): void {
    
}

function nextPokemon(id: number): void {
    if (id > 1026) {
        router.push('/pokemons/1026', 'forward')
    }

    router.push('/pokemons/'+(id+1), 'forward')
}

export default {
    prePokemon,
    nextPokemon
}

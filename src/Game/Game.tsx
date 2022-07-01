import { Player } from "./Player"

export interface Game {
    id: number,
    game_state: string,
    is_turn: number,
    player1_id: number,
    player2_id: number,
    player1: Player | undefined,
    player2: Player | undefined
} 
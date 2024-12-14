import { PartialMessage } from "@bufbuild/protobuf";
import { Application, ReaderContext, WriterContext } from "@reboot-dev/reboot";
import {
  Game,
  HistoryRequest,
  HistoryResponse,
  UpdateRequest,
  UpdateRespoonse,
} from "../../api/tic_tac_toe/v1/game_rbt.js";

class GameServicer extends Game.Servicer {
  async history(
    _context: ReaderContext,
    state: Game.State,
    _request: HistoryRequest,
  ): Promise<PartialMessage<HistoryResponse>> {
    return { history: state.history };
  }

  async update(
    _context: WriterContext,
    state: Game.State,
    request: UpdateRequest,
  ): Promise<PartialMessage<UpdateRespoonse>> {
    state.history = request.history;
    return {};
  }
}

const initialize = async (context) => {
  await Game.construct({ id: "TICTACTOE" })
    .idempotently()
    .update(context, { history: JSON.stringify([Array(9).fill(null)]) });
};

new Application({
  servicers: [GameServicer],
  initialize,
}).run();

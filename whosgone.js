import bwapi from "./api/api"

const whosgone = async () => {

  const playerInfo = await bwapi.getPlayerInfo('lewandowski')

  console.info(playerInfo)
  
}

whosgone()

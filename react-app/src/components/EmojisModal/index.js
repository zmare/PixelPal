import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmojisThunk } from "../../store/emojis";
import { createReactionThunk } from "../../store/message";
import "./GetAllEmojis.css"

export default function GetAllEmojis({ props: { messageId, sessionUserId } }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllEmojisThunk())
  }, [dispatch])

  const emojis = useSelector(state => state.emoji.allEmojis)
  const allEmojisArr = Object.values(emojis)

  const createReaction = async (emojiId, messageId, sessionUserId) => {
    let new_reaction = await dispatch(createReactionThunk(emojiId, messageId, sessionUserId))
    return (new_reaction)
  }

  return (
    <div className='emojis-modal-container-container'>
      <div className='emoji-modal-container'>
        {allEmojisArr.map(emoji => {
          return (
            <div className='emoji-modal-emoji'
              value={emoji.id}
              onClick={() => { createReaction(emoji.id, messageId, sessionUserId) }}
            >
              {String.fromCodePoint(emoji.url)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

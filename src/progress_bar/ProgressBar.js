import React, { useState }  from "react"
import Exercise from "../exercise/Exercise"

const ProgressBar = () => {
  return (
    <div className="progress-bar-view">
      <Exercise
        solution = {<Solution />}
        specsUrl = "https://github.com/CommissionAI/spiff_react_exercises/issues/1"
        title    = "Progress Bar Exercise"
      />
    </div>
  )
}

export default ProgressBar

// ----------------------------------------------------------------------------------



const Solution = () => {
  const LOADING_TIMEOUT_IN_MS = 15000 //todo: pass these value into scss via css variable or StyledComponents
  const RESET_TIMER = 3000
  const COMPLETE_REQUEST_TIMER = 1000
  const [loadingState, setloadingState] = useState({status:'unloaded', buttonText: 'start request'})
  const {status, buttonText} = loadingState

  const handleButtonClick = () => {
    if (status === 'loading' || status === 'complete') return
    if (status === 'paused') {
      setloadingState({status: 'complete', buttonText: 'loading...'})
      setTimeout(() => {
        setloadingState({status: 'complete', buttonText: 'request complete'})
        setTimeout(() => {
          setloadingState({status: 'unloaded', buttonText: 'start request'})
        }, RESET_TIMER)
      }, COMPLETE_REQUEST_TIMER)
      return
    }
    setloadingState({status: 'loading', buttonText: 'loading...'})

    setTimeout(() => {
      setloadingState({status: 'paused', buttonText: 'finish request'})
    }, LOADING_TIMEOUT_IN_MS)
  }

  return (
    <div className="progress-bar-container">
      <button className={'button ' + status} onClick={handleButtonClick}>{buttonText}</button>
      <div className="progress-bar">
        <div className={'loading-bar ' + status}></div>
      </div>
    </div>
  )
}

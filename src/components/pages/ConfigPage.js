import React, { useState, useEffect } from 'react'
import NavBar from '../navigation/NavBar'
import { ConfigGrid } from '../objects/ConfigGrid'
import Add from '../buttons/Add'
import { getConfigList } from '../../api/rest'
import { serverHost } from '../../api/config'
import Slide from '@material-ui/core/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ConfigPage() {
  const [configList, setConfigList] = useState([])

  useEffect(() => {
    ;(async () => {
      const configListData = await getConfigList()
      setConfigList(configListData.configList)
    })()
  }, [])

  return (
    <>
      <NavBar />
      <ConfigGrid
        transition={Transition}
        configList={configList}
        setConfigList={setConfigList}
      />
      <Add
        transition={Transition}
        configList={configList}
        setConfigList={setConfigList}
      />
    </>
  )
}

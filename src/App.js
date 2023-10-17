import {useState, useEffect} from 'react'
import {AiOutlineBars, AiOutlineAppstore} from 'react-icons/ai'

import './App.css'

const arrangement = {
  list: 'LIST',
  grid: 'GRID',
}

const App = () => {
  const [detail, changeDetail] = useState([])
  const [inputValue, changeInput] = useState('')
  const [arrangements, changeArrangement] = useState('LIST')

  const getDetails = async () => {
    const url = 'https://mocki.io/v1/0934df88-6bf7-41fd-9e59-4fb7b8758093'

    const details = await fetch(url)
    const finalDetails = await details.json()
    const {data} = finalDetails

    const object = data.map(eachItem => ({
      badge: eachItem.product_badge,
      image: eachItem.product_image,
      title: eachItem.product_title,
      v1: eachItem.product_variants[0].v1,
      v2: eachItem.product_variants[1].v2,
      v3: eachItem.product_variants[2].v3,
    }))

    changeDetail(object)
  }

  useEffect(() => {
    getDetails()
  }, [])

  // LIST BOXES
  const listHatBox = () => (
    <>
      {detail.map(item => {
        const v1Text = item.v1
          .split('/')
          .map(eachItem => eachItem.toLowerCase())
        const v2Text = item.v2
          .split('/')
          .map(eachItem => eachItem.toLowerCase())
        const v3Text = item.v3
          .split('/')
          .map(eachItem => eachItem.toLowerCase())
        const colorV1 = v1Text.includes(inputValue.toLowerCase())
          ? 'highlightText'
          : 'texts'

        const colorV2 = v2Text.includes(inputValue.toLowerCase())
          ? 'highlightText'
          : 'texts'

        const colorV3 = v3Text.includes(inputValue.toLowerCase())
          ? 'highlightText'
          : 'texts'

        return (
          <div className="hatBox">
            <div className="leftSide">
              <div className="newBox">{item.badge}</div>
              <img src={item.image} className="hatImage" alt={item.title} />
            </div>

            <div className="rightSide">
              <h1 className="limited">{item.title}</h1>
              <p className={colorV1}>{item.v1}</p>
              <p className={colorV2}>{item.v2}</p>
              <p className={colorV3}>{item.v3}</p>
            </div>
          </div>
        )
      })}
    </>
  )

  //   GRID BOXES
  const gridHatBox = () => (
    <>
      <div className="topBoxs">
        {detail.map(items => {
          const v1Text = items.v1
            .split('/')
            .map(eachItem => eachItem.toLowerCase())
          const v2Text = items.v2
            .split('/')
            .map(eachItem => eachItem.toLowerCase())
          const v3Text = items.v3
            .split('/')
            .map(eachItem => eachItem.toLowerCase())
          const colorV1 = v1Text.includes(inputValue.toLowerCase())
            ? 'highlightText'
            : 'texts'

          const colorV2 = v2Text.includes(inputValue.toLowerCase())
            ? 'highlightText'
            : 'texts'

          const colorV3 = v3Text.includes(inputValue.toLowerCase())
            ? 'highlightText'
            : 'texts'

          return (
            <div className="gridBox">
              <div className="topBox">
                <div className="newBoxs">{items.badge}</div>
                <img src={items.image} className="hatImage" alt={items.title} />
              </div>

              <div className="bottomSide">
                <h1 className="limited">{items.title}</h1>
                <p className={colorV1}>{items.v1}</p>
                <p className={colorV2}>{items.v2}</p>
                <p className={colorV3}>{items.v3}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )

  return (
    <div className="background">
      <h1 className="heading">PLP</h1>
      <div className="inputBoxes">
        <input
          type="search"
          className="inputBox"
          placeholder="Type something to search"
          value={inputValue}
          onChange={e => {
            changeInput(e.target.value)
          }}
        />
        <AiOutlineBars
          className="icons"
          onClick={() => {
            changeArrangement(arrangement.list)
          }}
        />
        <AiOutlineAppstore
          className="icons"
          onClick={() => {
            changeArrangement(arrangement.grid)
          }}
        />
      </div>

      {/* Arrangements */}
      <div className="box">
        {arrangements === 'LIST' && listHatBox()}
        {arrangements === 'GRID' && gridHatBox()}
      </div>
    </div>
  )
}

export default App


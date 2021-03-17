import { render } from 'react-dom'
import React, { useState, useEffect } from 'react'
import { useTransition, animated } from 'react-spring'
import './styles.css'

//21. SATIRDAKİ COMMENT BURASI İLE İLİŞKİLİ!!
const pages = [
  ({ style }) => <animated.div style={{ ...style,}}>yazı1</animated.div>,
  ({ style }) => <animated.div style={{ ...style,}}>yazı2</animated.div>,
  ({ style }) => <animated.div style={{ ...style,}}>yazı3</animated.div>,
  ({ style }) => <animated.div style={{ ...style,}}>yazı4</animated.div>,
]

export default function App() {
  const [index, set] = useState(0)
  const transitions = useTransition(index, p => p, {
    from: { opacity: 0, transform: 'translate3d(0,100%,0)' },
    enter: { opacity: 1, transform: 'translate3d(0,0%,0)' },
    leave: { opacity: 0, transform: 'translate3d(0,-50%,0)' },
  })
  // ÖNEMLİ NOT: Şu an 4 tane pages varve pages sayısı aşağıdaki satırda (state +1) % 4 sayısındaki 4'e eşit. pages sayısını
  //değiştirdiğinde o sayıyı da değiştirmen gerek yoksa hata verir, loop başa sarmaz. 3 pages olacaksa % işaretinden sonraki
  //sayı da 3 olmak zorunda.
  useEffect(() => void setInterval(() => set(state => (state + 1) % 4), 2000), [])
  return (
    <div className="simple-trans-main">
      {transitions.map(({ item, props, key }) => {
        const Page = pages[item]
        return <Page key={key} style={props} />
      })}
    </div>
  )
}

render(<App />, document.getElementById('root'))

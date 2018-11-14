import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import BlogDetails from './BlogDetails'
import ToggleDetails from './ToggleDetails'

describe.only('<ToggleDetails />', () => {
  let togglableComponent

  beforeEach(() => {
    togglableComponent = shallow(
      <ToggleDetails label="Testing title">
        <div className="testDiv" />
      </ToggleDetails>
    )
  })


  it('renders its children', () => {
   // console.log(togglableComponent.debug())
    expect(togglableComponent.contains(<div className="testDiv" />)).toEqual(true)
  })

  it('at start the children are not displayed', () => {
    const divRest = togglableComponent.find('.togglableContent')
    //console.log(divRest.debug())
    expect(divRest.getElement().props.style).toEqual({ display: 'none' })
  })

  it('after clicking the title, children are displayed', () => {
    const divTitle = togglableComponent.find('.title')
    //console.log(divTitle.debug())
    divTitle.simulate('click')
    const divRest = togglableComponent.find('.togglableContent')
    //console.log(divRest.debug())


    expect(divRest.getElement().props.style).toEqual({ display: '' })
  })

})
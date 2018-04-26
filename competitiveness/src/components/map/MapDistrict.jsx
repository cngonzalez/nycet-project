import React from 'react';
import { connect } from 'react-redux'; 
import { showTooltip } from '../../actions/index'; 
import { Link } from 'react-router-dom';

const MapDistrictContainer = ({d, projection, fill, linkParams, isMoused,
                               isHighlighted, showTooltip}) => (
  <Link to={linkParams}>
    ((isHighlighted) ? <path d={projection} fill='#f4b342' /> : '')
    <path
      data={d}
      d={projection}
      fill={fill}
      className={ (isHighlighted) ? 'highlighted-district' : 'district' }
      filter={(isMoused) ? 'url(#glow)' : ''}
      onMouseEnter={(e) => showTooltip(e, d.properties.districtNumber)}
    />
  </Link>

)

const determineLink = (state, districtNumber) => {
  if (state.districtType === 'ED') {
    return {pathname: `/${state.parentDistrictType}/${state.selectedDistrict}/?ED=${districtNumber}`,
            search: `?ED=${districtNumber}`}
  } else {
    return {pathname: `/${state.parentDistrictType}/${districtNumber}`}
  }
}
    
const mapStateToProps = (state, ownProps) => (
  {...ownProps,
   linkParams: determineLink(state, ownProps.d.properties.districtNumber),
   isMoused: ownProps.d.properties.districtNumber === state.tooltip.districtNumber,
   isHighlighted: ownProps.d.properties.districtNumber === parseInt(state.highlightedEdData.ed, 10)})

const MapDistrict = connect(mapStateToProps, { showTooltip: showTooltip })(MapDistrictContainer)

export default MapDistrict

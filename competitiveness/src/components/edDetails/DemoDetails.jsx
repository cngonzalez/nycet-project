import React from 'react';
import DemoTab from './DemoTab';
import TurnoutTab from './TurnoutTab';
import { Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';

const DemoDetailsContainer = ({tabs, height, width, type}) => {

    let formattedPanes; 
    if (type === 'demo') {
      formattedPanes = tabs.map((t, i) => (
        { menuItem: t.title,
          render: () => <DemoTab 
            key={`demotab-${i}`} 
            tab={t}
            plotHeight={ height }
            plotWidth={ width }
          /> }
       ))
    }
    else {
      formattedPanes = tabs.map((t, i) => (
        { menuItem: t.title,
          render: () => <TurnoutTab 
            key={`demotab-${i}`} 
            tab={t}
            plotHeight={ height }
            plotWidth={ width }
          /> }
 ))
}

    return (
      <div>
        <Tab menu={{className: 'wrapped',
          attached: true}} 
             panes={formattedPanes} />
      </div>
    )
}

const mapStateToProps = (state) => (
  {width: state.sidebarDimensions[0],
   height: state.sidebarDimensions[1]}
)

const DemoDetails = connect(mapStateToProps)(DemoDetailsContainer)

export default DemoDetails;

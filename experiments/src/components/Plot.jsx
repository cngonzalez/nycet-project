import React from 'react'
import { VictoryChart, VictoryBoxPlot, VictoryAxis, VictoryLabel, VictoryTooltip } from 'victory'

const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

const GroupLabel = (props) =>
  <VictoryLabel
    { ...props }
    textAnchor="middle"
    style={{fontSize: 8, fontWeight: 300}}
  />

const Plot = ({ data, groupSizes: {treatment_pop, control_pop} }) =>
{
  return (
  <VictoryChart domainPadding={20}>
    <GroupLabel
      text={`Election Treatment Size: ${withCommas(treatment_pop)}`}
      x={150} y={30}
    />
    <GroupLabel
      text={`Election Control Size: ${withCommas(control_pop)}`}
      x={300} y={30}
    />
    <VictoryBoxPlot
      data={data.map(d => ({ ...d, min: d.ci_low, max: d.ci_high }))}
      maxLabels={d => d.x.replace(' ', '\n')}
      maxLabelComponent={
        <VictoryLabel
          dx={-10} dy={-10}
          textAnchor="middle"
          style={{fontSize: 6}}
        />
      }
      q3Labels={d => `Treatment Size: ${withCommas(d.treatment_pop)}\n Control Size: ${withCommas(d.control_pop)}`}
      events={[{
        target: "maxLabels",
        eventHandlers: {
          onMouseOver: () => ({ target: "q3Labels", mutation: () => ({ active: true }) }),
          onMouseOut: () => ({ target: "q3Labels", mutation: () => ({ active: false }) })
        }
      }]}
      q3LabelComponent={
        <VictoryTooltip
          style={{fontSize: 6}}
          orientation="right"
          pointerLength={0}
        />
      }
    />
    <VictoryAxis tickFormat={t => ''}/>
    <VictoryAxis
      dependentAxis
      label="Point Difference in Voter Turnout"
      style={{
        tickLabels: {fontSize: 6},
        axisLabel: {fontSize: 8}
      }}/>
  </VictoryChart>
)}
export default Plot
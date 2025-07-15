import CardContainer from '../../ui/CardContainer'
import GradientText from '../../ui/GradientText'
import GradientButton from '../../ui/GradientButton'
import LineCurveRef from '../../graphs/LineCurveRef'

const ProposalsSubmitted = () => {
  return (
    <CardContainer className="h-[350px]">
        <div className="flex justify-between">
            <GradientText>Proposals Submitted</GradientText>
            <GradientButton selectOptions={["1st Quarter", "2nd Quarter", "3rd Quarter", "4th Quarter"]} initialSelected="1st Quarter" className="w-30"/>
        </div>
        <div style={{ width: "500px", height: "300px" }} className="">
      <LineCurveRef
        labels={[
          "Jan Start", "Jan End", 
          "Feb Start", "Feb End", 
          "Mar Start", "Mar End"
        ]}
        dataPoints={[
          9500, 10000,  // Jul (Start → End)
          10000, 10700, // Aug (Start → End)
          10500, 9500  // Sep (Start → End)
        ]}
      />
    </div>
    </CardContainer>
  )
}

export default ProposalsSubmitted;
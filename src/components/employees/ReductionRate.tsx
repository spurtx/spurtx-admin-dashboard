import CardContainer from '../../components/ui/CardContainer';
import GradientText from '../../components/ui/GradientText'
import GradientButton from '../../components/ui/GradientButton'
import LineCurveRef from '../../components/graphs/LineCurveRef'

const ReductionRate = () => {
  return (
    <CardContainer className="h-[380px]">
        <div className="flex justify-between">
            <GradientText className='font-semibold'>Employee Reduction Rate</GradientText>
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

export default ReductionRate;

import CardContainer from '../ui/CardContainer'
import GradientText from '../ui/GradientText'
import GeoBarChart from './GeoBarChart'

const AcceptedCand = () => {
  return (
    <CardContainer className='h-[340px]'>
        <GradientText className='mb-4'>Accepted candidates geolocation</GradientText>
        <div className='flex gap-5'>
            <div className='h-400px'>
                <GeoBarChart />
            </div>
            <div className='text-gray-500 flex flex-col'>
                <span>Nig - Nigeria</span>
                <span>Gha - Ghana</span>
                <span>Mal - Mali</span>
                <span>Cam - Cameroon</span>
                <span>Civ - Cote d'voire</span>
                <span>Tog - Togo</span>
                <span>Alg - Algeria</span>
            </div>

        </div>
    </CardContainer>
  )
}

export default AcceptedCand
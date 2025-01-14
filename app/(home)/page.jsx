import HeroSlider from '@/app/(home)/components/HeroSlider'
import PopularGames from '@/app/(home)/components/PopularGames'
import HowItWorks from './components/HowItWorks'
import Testimonial from '@/app/(home)/components/Testimonial'
import LatestBlogs from '@/app/(home)/components/LatestBlogs'

export const metadata = {
  title: 'Home | eGamio - Where dreams meet!',
  description: 'Join eGamio - The ultimate gaming and esports platform. Create your player or team account today!'
}


export default function Home() {
  return (
    <>
      <HeroSlider />
      <PopularGames />
      <HowItWorks />
      <Testimonial/>
      <LatestBlogs/>
    </>
  )
}

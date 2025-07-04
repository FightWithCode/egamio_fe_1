import HeroSlider from '@/components/home/HeroSlider'
import PopularGames from '@/components/home/PopularGames'
import HowItWorks from '@/components/home/HowItWorks'
import Testimonial from '@/components/home/Testimonial'
import LatestBlogs from '@/components/home/LatestBlogs'

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

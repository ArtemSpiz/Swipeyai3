import { useRef, useState, useEffect } from 'react'
import Header from '../layout/header'
import './Hero.css'

import firstBg from '../assets/images/firstBg.png'
import secondBg from '../assets/images/secondBg.png'
import thirdBg from '../assets/images/thirdBg.png'
import fourthBg from '../assets/images/fourthBg.png'

import secondBgHover2 from '../assets/images/secondBgHover2.png'
import secondBgHover3 from '../assets/images/secondBgHover3.png'
import secondBgHover4 from '../assets/images/secondBgHover4.png'

import thirdBgHover2 from '../assets/images/thirdBgHover2.png'
import thirdBgHover3 from '../assets/images/thirdBgHover3.png'

import fourthBgHover2 from '../assets/images/fourthBgHover2.png'
import fourthBgHover3 from '../assets/images/fourthBgHover3.png'

import Lips from '../assets/svg/lips'
import Heart from '../assets/svg/heart'
import Shoe from '../assets/svg/shoe'
import Angel from '../assets/svg/angel'

import secondIcon1 from '../assets/svg/secondIcon1'
import secondIcon2 from '../assets/svg/secondIcon2'
import secondIcon3 from '../assets/svg/secondIcon3'

import thirdIcon1 from '../assets/svg/thirdIcon1'
import thirdIcon2 from '../assets/svg/thirdIcon2'
import thirdIcon3 from '../assets/svg/thirdIcon3'

import Pencil from '../assets/svg/pencil'
import fourthBgMob from '../assets/images/fourthBgMob.png'

function Hero() {
	const [currentStep, setCurrentStep] = useState(0)
	const [isAnimating, setIsAnimating] = useState(false)
	const [hoveredIndex, setHoveredIndex] = useState(null)
	const [isMobile, setIsMobile] = useState(false)
	const sectionsRef = useRef([])

	const isHeaderVisible = currentStep === 0

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 640)
		}

		handleResize()
		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	}, [])

	const scrollToStep = step => {
		if (isAnimating || step === currentStep) return

		setIsAnimating(true)

		const currentSection = sectionsRef.current[currentStep]
		if (currentSection) {
			currentSection.style.opacity = '0'
			currentSection.style.transition = 'opacity 0.3s ease-out'
			setTimeout(() => {
				currentSection.style.display = 'none'
			}, 300)
		}

		setTimeout(() => {
			setCurrentStep(step)
			const newSection = sectionsRef.current[step]
			if (newSection) {
				newSection.style.display = 'flex'
				newSection.style.opacity = '0'
				setTimeout(() => {
					newSection.style.opacity = '1'
					newSection.style.transition = 'opacity 0.5s ease-in'
				}, 50)
			}
			setIsAnimating(false)
		}, 400)
	}

	const handleAnswerHover = (_, index) => {
		setHoveredIndex(index)
	}

	const handleAnswerLeave = () => {
		setHoveredIndex(null)
	}

	const heroContent = [
		{
			video: firstBg,
			underTitle: 'Your Personal AI Porn Feed Is Ready',
			title: 'Built by AI. Based on what turns you on',
			subtitle: "This isn't porn you search for. It's porn that finds you",
			button: 'Start My Feed',
		},
		{
			title: 'What Turns You On Most?',
			subtitle: 'Tap what makes you stay up late…',
			answers: [
				{ text: 'Flirty & Teasing', icon: Lips, bgVideo: secondBg },
				{ text: 'Hardcore', icon: Heart, bgVideo: secondBgHover2 },
				{ text: 'Dominant Girls', icon: Shoe, bgVideo: secondBgHover3 },
				{ text: 'Innocent but Naughty', icon: Angel, bgVideo: secondBgHover4 },
			],
		},
		{
			title: 'How wild should your feed be?',
			subtitle: 'Choose your intensity',
			answers: [
				{ text: 'Soft & Sensual', icon: secondIcon1, bgVideo: thirdBg },
				{ text: 'Dirty', icon: secondIcon2, bgVideo: thirdBgHover2 },
				{ text: 'No Limits', icon: secondIcon3, bgVideo: thirdBgHover3 },
			],
		},
		{
			title: 'Unlock a reel just for your kink—only you?',
			subtitle: 'Choose Option',
			answers: [
				{
					text: "Yes. That's the kind of dirty I need",
					icon: thirdIcon1,
					bgVideo: fourthBg,
				},
				{
					text: 'Maybe… if it really hits my fantasy',
					icon: thirdIcon2,
					bgVideo: fourthBgHover2,
				},
				{
					text: 'No, I just want to look, not touch',
					icon: thirdIcon3,
					bgVideo: fourthBgHover3,
				},
			],
		},
	]

	useEffect(() => {
		if (sectionsRef.current[0]) {
			sectionsRef.current[0].style.display = 'flex'
			sectionsRef.current[0].style.opacity = '1'
		}
	}, [])

	return (
		<div className='Hero'>
			<div
				className='heroHeader'
				style={{
					opacity: isHeaderVisible ? 1 : 0,
					transition: 'opacity 0.5s ease-in-out',
				}}
			>
				<Header />
			</div>
			<div className='heroDots'>
				{heroContent.map((_, i) => (
					<div
						key={i}
						className={`heroDot ${i === currentStep ? 'active' : ''}`}
					></div>
				))}
			</div>

			<div className='heroBackgroundContainer'>
				<video className='heroSectionBg' autoPlay muted loop playsInline>
					<source
						src='https://d12kahz818c96x.cloudfront.net/prelander/MontageReelTiktok.webm'
						type='video/webm'
					/>
				</video>
			</div>

			<div className='heroBackgroundContainer2'>
				<video className='heroSectionBg2' autoPlay muted loop playsInline>
					<source
						src='https://d12kahz818c96x.cloudfront.net/prelander/MontageReelTiktok.webm'
						type='video/webm'
					/>
				</video>
			</div>

			<div className='heroContent'>
				{heroContent.map((content, index) => {
					return (
						<div
							ref={el => (sectionsRef.current[index] = el)}
							className='heroSection'
							key={index}
							style={{ display: 'none' }}
						>
							{content.underTitle && (
								<div className='heroUnderTitle'>{content.underTitle} </div>
							)}

							<div className='sectionContent'>
								<div className='sectionTexts'>
									<div
										className={`sectionTitle  ${
											index === 0 ? 'firstSectionTitle' : ''
										}`}
									>
										{content.title}
									</div>
									<div
										className={`sectionSubtitle  ${
											index === 0 ? 'firstSectionSubtitle' : ''
										}`}
									>
										{content.subtitle}
									</div>
								</div>

								{content.answers && (
									<div
										className={`sectionAnswers ${
											index === 1 ? 'gridThree' : ''
										}`}
									>
										{content.answers.map((answer, i) => {
											const isLastStep = index === heroContent.length - 1
											return (
												<a
													key={i}
													href={isLastStep ? '/signup' : '#'}
													className={`answerButton ${
														content.answers.length === 3 && i === 2
															? 'centerThird'
															: ''
													}`}
													style={{
														...(hoveredIndex === i
															? {
																	border: '1px solid #fe6283',
																	background:
																		'linear-gradient(82deg, rgba(39, 26, 43, 0.3) 5.24%, rgba(78, 40, 60, 0.3) 98.12%)',
																	boxShadow: '0px 0px 14px 0px #fe6283',
															  }
															: hoveredIndex !== null
															? { opacity: 0.6 }
															: {}),
													}}
													onMouseEnter={() =>
														handleAnswerHover(answer.bgVideo, i)
													}
													onMouseLeave={handleAnswerLeave}
													onClick={e => {
														if (!isLastStep) {
															e.preventDefault()
															handleAnswerLeave()
															scrollToStep(index + 1)
														}
													}}
												>
													<answer.icon className={'heroIconAnswer'} />
													<div className='answerButtonText'>{answer.text}</div>
												</a>
											)
										})}
									</div>
								)}

								{content.button && (
									<button
										className='sectionButton'
										onClick={() => scrollToStep(index + 1)}
									>
										<Pencil className='heroPencil' /> {content.button}
									</button>
								)}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Hero

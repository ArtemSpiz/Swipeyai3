import './CreateAccount.css'

import Google from '../../assets/svg/google'
import { useState, useEffect, useRef } from 'react'
import Eye from '../../assets/svg/Eye'
import Arrow from '../../assets/svg/Arrow'
import ChatIcon from '../../assets/svg/chatIcon'
import CloseCrosse from '../../assets/svg/closseCross'
import Coin from '../../assets/images/coin.png'
import Members from '../../assets/images/members.png'

function CreateAccount() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const googleBtnRef = useRef(null)
	const [openForm, setOpenForm] = useState(false)

	const [randomNum, setRandomNum] = useState(10000)

	useEffect(() => {
		setRandomNum(Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000)
	}, [])

	const CONFIG = {
		GOOGLE_AUTH_URL: 'https://swipey.ai/api/v1/auth/google/login',
	}

	const validateEmail = email => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
	}

	useEffect(() => {
		const rtkClickID = document.cookie.match(/rtkclickid-store=([^;]+)/)?.[1]
		const params = new URLSearchParams(window.location.search)

		const utmObj = {
			rtkcid: rtkClickID,
			click_id: rtkClickID,
			cmpid: rtkClickID,
			pubid: params.get('pubid'),
			prelandername: params.get('prelandername'),
			utm_source: params.get('utm_source'),
			utm_medium: params.get('utm_medium'),
			utm_campaign: params.get('utm_campaign'),

			path: '/explorer?tab=spicy',
		}

		if (googleBtnRef.current) {
			googleBtnRef.current.href = `${
				CONFIG.GOOGLE_AUTH_URL
			}?state=${encodeURIComponent(JSON.stringify(utmObj))}`
		}
	}, [])

	const handleSubmit = () => {
		const isEmailValid = validateEmail(email)
		const isPasswordValid = password.length > 0

		setEmailError(!isEmailValid)
		setPasswordError(!isPasswordValid)

		if (!isEmailValid || !isPasswordValid) return

		submitAccount()
	}

	const togglePasswordVisibility = () => {
		setIsVisible(prev => !prev)
		setShowPassword(prev => !prev)
	}

	const getClickIdFromCookies = () => {
		const match = document.cookie.match(/rtkclickid-store=([^;]+)/)
		return match ? match[1] : null
	}

	const submitAccount = async () => {
		const clickId = getClickIdFromCookies()
		if (!clickId) {
			alert('Click ID not found in cookies.')
			return
		}

		const utm = JSON.parse(localStorage.getItem('utm_data') || '{}')

		try {
			const response = await fetch('https://swipey.ai/api/v1/auth/pre-lander', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-api-key': '3b6b40c8-8b6d-4094-8e67-93fc80ae99cb',
				},
				body: JSON.stringify({
					email,
					password,
					clickId,
					...utm,
				}),
			})

			const data = await response.json()

			if (data.success && data.loginUrl) {
				window.location.href = 'https://swipey.ai/explorer?tab=spicy'
			} else {
				alert(data.message || 'Something went wrong.')
			}
		} catch (error) {
			console.error('API error:', error)
			alert('Failed to create account.')
		}
	}

	return (
		<div className='CreateAccount'>
			<video className='signUpSectionBg1' autoPlay muted loop playsInline>
				<source
					src='https://d12kahz818c96x.cloudfront.net/prelander/MontageReelTiktok.webm'
					type='video/webm'
				/>
			</video>
			<div className='signUpContent'>
				<video className='signUpSectionBg2' autoPlay muted loop playsInline>
					<source
						src='https://d12kahz818c96x.cloudfront.net/prelander/MontageReelTiktok.webm'
						type='video/webm'
					/>
				</video>
				<div className='signUpTexts'>
					<div className='signUpTitles'>
						<div className='signUpUnderTitle'>
							<ChatIcon className='chatIcon' /> GET 20 FREE MESSAGES
						</div>

						<div className='signUpTitle'>
							Unlimited Fun with AI Fantasy Girls
						</div>
					</div>

					<div className='signUpSubtitles'>
						<div className='signUpSubtitle'>
							💬 No filters. Just raw, spicy chat.
						</div>
						<div className='signUpSubtitle'>
							🔥 Custom AI girls made to match your desires.
						</div>
						<div className='signUpSubtitle'>
							🎁 Unlock exclusive content & daily rewards.
						</div>
					</div>
				</div>

				<div className='signUpForm'>
					<a href='#' ref={googleBtnRef} className='signUpGoggle'>
						<Google /> Join FREE With Google
					</a>

					<div className='signUpOr'>
						<span />
						or
						<span />
					</div>

					<a
						className='signUpManual'
						href='#'
						onClick={() => setOpenForm(true)}
					>
						Manual Sign Up <Arrow />
					</a>

					{openForm && (
						<div className='popupOverlay'>
							<div className='signUpManualForm'>
								<div className='closeCrosse'>
									<CloseCrosse onClick={() => setOpenForm(false)} />
								</div>

								<div className='signUpManualFormTitles'>
									<div className='signUpManualFormTitle'>
										Jump into private chats & voice calls with the hottest
										models<span> only on Swipey</span>
									</div>
									<div className='signUpManualFormSubtitle'>
										👇<span>{randomNum} members</span> joined today 👇
									</div>
								</div>

								<div className='signUpInputs'>
									<input
										className={`signUpInputEmail ${
											emailError ? 'input-error' : ''
										}`}
										type='email'
										placeholder='Email'
										value={email}
										onChange={e => {
											setEmail(e.target.value)
											if (emailError) setEmailError(false)
										}}
									/>

									<div
										className={`createPasswordWrapper ${
											passwordError ? 'input-error' : ''
										}`}
									>
										<input
											className='createPassword'
											type={showPassword ? 'text' : 'password'}
											placeholder='Password'
											value={password}
											onChange={e => {
												setPassword(e.target.value)
												if (passwordError) setPasswordError(false)
											}}
										/>

										<Eye
											className='eye'
											isVisible={isVisible}
											onClick={togglePasswordVisibility}
										/>
									</div>
								</div>

								<button onClick={handleSubmit} className='signUpBtn'>
									Sign Up
								</button>
							</div>
						</div>
					)}
				</div>

				<div className='signUpMembers'>
					<div className='signUpMembersImg'>
						<img src={Members} alt='Members' />
					</div>

					<div className='signUpMembersText'>
						<span>3M+</span> Members from <span>100+</span> Countries
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateAccount

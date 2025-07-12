import './CreateAccount.css'
import blondGirl from '../../assets/images/blondGirl.png'
import brownGirl from '../../assets/images/brownGirl.png'
import coin from '../../assets/images/coin.png'

import Google from '../../assets/images/google.png'
import { useState, useEffect, useRef } from 'react'
import Eye from '../../assets/svg/Eye'
import Arrow from '../../assets/svg/Arrow'

const socialContent = [
	{
		icon: Google,
		title: 'Google',
	},
]

function CreateAccount() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)
	const [isVisible, setIsVisible] = useState(false)
	const [emailError, setEmailError] = useState(false)
	const [passwordError, setPasswordError] = useState(false)
	const googleBtnRef = useRef(null)

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
				const redirectUrl = new URL(data.loginUrl)

				window.location.href = redirectUrl.toString()
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
			<div className='blondGirl'>
				<img src={blondGirl} alt='blondGirl' />
			</div>
			<div className='brownGirl'>
				<img src={brownGirl} alt='brownGirl' />
			</div>

			<div className='signUpTitle'>
				Before we drop you in,
				<span className='signUpTitle2'> save your preferences</span>
			</div>

			<div className='signUpContent'>
				<div className='signUpTexts'>
					<div className='signUpContentTitle'>Create your account</div>
					<div className='signUpSubtitle'>
						& Get 20 <img src={coin} alt='coin' className='coin' /> FREE To
						Unlock Spicy Videos
					</div>
				</div>

				<div className='signUpForm'>
					<div className='signUpSoc'>
						{socialContent.map((soc, index) => (
							<a
								ref={googleBtnRef}
								href='#'
								className='socialContent'
								key={index}
							>
								<div className='signUpSocIcon'>
									<img src={soc.icon} alt='socIcon' />
								</div>
								<div className='signUpSocTitle'>{soc.title}</div>
							</a>
						))}
					</div>

					<div className='signUpOr'>
						<span />
						or
						<span />
					</div>

					<div className='signUpInputs'>
						<input
							className={`signUpInputEmail ${emailError ? 'input-error' : ''}`}
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
						Sing Up
					</button>

					<div className='signUpTerm'>
						By signing up, you agree to{' '}
						<span>Term of Service & Privacy Policy</span>
					</div>
					<div className='signUpFooter'>
						Already have an account?{' '}
						<a
							className='signUpLogIn'
							href='http://swipey.ai/?open_modal=sign-in'
							target='_blank'
							rel='noopener noreferrer'
						>
							Log in <Arrow />{' '}
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreateAccount

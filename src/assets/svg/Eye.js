const Eye = ({ className, onClick, isVisible }) => {
	return isVisible ? (
		// 👁 НЕ перекреслене око
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='16'
			viewBox='0 0 18 16'
			fill='none'
			className={className}
			onClick={onClick}
		>
			<path
				d='M1.5 8C1.5 8 4 2.5 9 2.5C14 2.5 16.5 8 16.5 8C16.5 8 14 13.5 9 13.5C4 13.5 1.5 8 1.5 8Z'
				stroke='#9B9CAA'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<circle cx='9' cy='8' r='2.5' stroke='#9B9CAA' strokeWidth='1.5' />
		</svg>
	) : (
		// 🙈 Перекреслене око (твій поточний SVG)
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='18'
			height='16'
			viewBox='0 0 18 16'
			fill='none'
			className={className}
			onClick={onClick}
		>
			<path
				d='M7.92773 3.39488C8.21213 3.35482 8.50552 3.33333 8.8077 3.33333C12.3801 3.33333 14.7244 6.33656 15.5119 7.52455C15.6072 7.66833 15.6549 7.74023 15.6816 7.85112C15.7016 7.93439 15.7016 8.06578 15.6815 8.14905C15.6548 8.25993 15.6068 8.3323 15.5109 8.47705C15.301 8.79343 14.9811 9.23807 14.5573 9.7203M5.11553 4.47669C3.60252 5.45447 2.57537 6.81292 2.10417 7.52352C2.00842 7.66791 1.96055 7.74011 1.93386 7.85099C1.91382 7.93426 1.91381 8.06563 1.93384 8.14891C1.96052 8.25979 2.00817 8.33168 2.10349 8.47545C2.89104 9.66344 5.23526 12.6667 8.8077 12.6667C10.2482 12.6667 11.4889 12.1784 12.5085 11.5177M2.50956 2L15.1058 14M7.32322 6.58579C6.9433 6.94772 6.70832 7.44772 6.70832 8C6.70832 9.10457 7.64825 10 8.8077 10C9.38743 10 9.91227 9.77614 10.2922 9.41421'
				stroke='#9B9CAA'
				strokeWidth='1.5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	)
}

export default Eye

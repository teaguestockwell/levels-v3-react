export const Help = () => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
    >
      <a
          href={'https://forms.gle/Bbqvubn6gwC6fRnc8'}
          target="_blank"
          rel="noreferrer"
        >
          <div
        style={{
          background: '#06BA7F',
          color: '#fff',
          boxShadow: '0px 0px 6px 2px rgba(170, 170, 170, 0.36)',
          borderRadius: 45,
          width: 'fit-content',
          paddingLeft: 10,
          paddingRight: 10,
          height: 60,
          overflowWrap: 'break-word',
          cursor: 'pointer',
          textAlign: 'center',
          lineHeight: '60px',
        }}
        data-testid="contact button"
      >
            Contact Us
          </div>
        </a>
    </div>
  )
}

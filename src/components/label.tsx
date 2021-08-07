export const Label = ({
  text,
  icon,
}: {
  text: string
  icon: JSX.Element
}) => {
  return (
    <div style={{display: 'flex',alignItems: 'left', marginLeft: 14, paddingTop: 14}}>
        {icon}
        <div
          style={{
            paddingLeft: 6,
            textAlign: 'center',
            color: '#06645E',
            fontWeight: 'normal',
            fontSize: '18px',
            textShadow: '0px 2px 4px rgba(0, 0, 0, 0.15)',
          }}
        >
          {text}
        </div>
    </div>
  )
}

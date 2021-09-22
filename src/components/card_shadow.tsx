export const CardShadow = ({
  children,
  style,
}: {
  children: JSX.Element | JSX.Element[];
  style?: any
}) => {
  return (
    <div
      style={{
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 15,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

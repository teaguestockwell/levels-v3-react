import {Const} from '../utils/const'

export const MaxContent = ({
  children,
}: {
  children: JSX.Element[] | JSX.Element
}) => {
  return (
    <div
      style={{
        justifyContent: 'center',
        alignContent: 'center',
        display: 'flex',
      }}
    >
      <div
        style={{
          maxWidth: Const.MAX_WIDTH,
          width: '100%',
        }}
      >
        {children}
      </div>
    </div>
  )
}

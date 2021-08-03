import {Button} from 'antd'
import {Const} from '../utils/const'


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
          <Button
            size="large"
            style={{
              textAlign: 'center',
              maxWidth: Const.MAX_WIDTH,
              borderColor: 'transparent',
              width: 200,
              backgroundColor: '#06645E',
              color: 'white',
              boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
            data-testid="contact button"
          >
            Contact Us
          </Button>
        </a>
    </div>
  )
}

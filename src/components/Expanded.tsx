import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

interface Props {
  title: string
  child: JSX.Element
}
export function Expanded(props: Props) {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>{props.title}</Typography>
      </AccordionSummary>
      <AccordionDetails>{props.child}</AccordionDetails>
    </Accordion>
  )
}

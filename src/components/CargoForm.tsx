import {Button} from '@material-ui/core'
import {TextField} from 'formik-material-ui'
import Box from '@material-ui/core/Box'
import {Field, Form, Formik, isInteger} from 'formik'
import {ICargoString, ICargo} from '../types/ICargo'
import {CargoStore} from '../store/CargoStore'
import {AircraftStore} from '../store/AircraftStore'
import {Const} from '../const'
import { IAircraft } from '../types/IAircraft'

export function CargoForm(props: ICargo) {
  const deleteCargo = CargoStore((state) => state.deleteCargo)
  const selectedAirId = AircraftStore((state) => state.selectedAirId as number)
  const aircraftMap = AircraftStore((state) => state.aircraftsMap)
  const selectedAir = aircraftMap.get(selectedAirId) as IAircraft

  interface IFormField {
    name: string
    type: string
    label: string
    helpertext: string
  }

  const initVals: ICargoString = {
    name: props.name ?? '',
    weight: props.weight.toPrecision(Const.initFormDeicmalPrecision) ?? '',
    fs: props.fs.toPrecision(Const.initFormDeicmalPrecision) ?? '',
    qty: props.qty.toString() ?? '',
  }

  const formTextFeilds: IFormField[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
      helpertext: 'Name',
    },
    {
      name: 'weight',
      type: 'text',
      label: 'Weight lbs',
      helpertext: 'Weight lbs',
    },
    {
      name: 'fs',
      type: 'text',
      label: 'Fuselage Station',
      helpertext: 'Fuselage Station',
    },
    {
      name: 'qty',
      type: 'text',
      label: 'Quantity',
      helpertext: 'Quantity',
    },
  ]

  function validateForm(values: ICargoString) {
    const errors: Partial<ICargoString> = {}

    // name
    if (!values.name) {
      errors.name = 'Required'
    }

    // weight
    if (!values.weight) {
      errors.weight = 'Required'
    } else if (isNaN(parseFloat(values.weight))) {
      errors.weight = 'Must be a number'
    } else if (parseFloat(values.weight) <= 0) {
      errors.weight = 'Must be > 0'
    }

    else {
      if (parseFloat(values.weight) > selectedAir.cargoweight1) {
        errors.weight = `Must be <= ${selectedAir.cargoweight1}`
      }
    }

    // fs
    if (!values.fs) {
      errors.fs = 'Required'
    } else if (isNaN(parseFloat(values.fs))) {
      errors.fs = 'Must be a number'
    }

    else if (parseFloat(values.fs) < selectedAir.fs0) {
      errors.fs = `Must be >= ${selectedAir.fs0}`
    }

    else {
      if (parseFloat(values.fs) > selectedAir.fs1 ) {
        errors.fs = `Must be <= ${selectedAir.fs1}`
      }
    }

    // qty
    if (!values.qty) {
      errors.qty = 'Required'
    } else if (isNaN(parseInt(values.qty))) {
      errors.qty = 'Must be a number'
    } else if (isInteger(parseInt(values.qty))) {
      errors.qty = 'Must be an integer'
    } else {
      if (parseInt(values.qty) <= 0) {
        errors.qty = 'Must be > 0'
      }
    }

    return errors
  }

  function submitForm(x: any) {}

  function getFields(): JSX.Element[] {
    return formTextFeilds.map((x) => (
      <Box margin={1} key={`box ${x.name}`}>
        <Field
          key={`field ${x.name}`}
          variant="outlined"
          component={TextField}
          name={x.name}
          type={x.type}
          label={x.label}
        />
      </Box>
    ))
  }

  return (
    <Formik
      validateOnMount={true}
      isInitialValid={false}
      initialErrors={validateForm(initVals)}
      initialValues={initVals}
      validate={validateForm}
      onSubmit={(values, {setSubmitting}) => {
        setTimeout(() => {
          setSubmitting(false)
          submitForm(values)
        }, 2000)
      }}
    >
      {({submitForm, isSubmitting, touched, errors, validateForm}) => (
        <Form>
          {getFields()}
          <Box margin={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => deleteCargo(props.id)}
            >
              Delete
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  )
}

const validateObjects = values => {

    const errors = {}


    if (!(!values.objects || !values.objects.length)) {

        values.objects.forEach((object, objectIndex) => {
            const objectErrors = { _error: `Object Key '${object.key}' should be unique` }
            if (values.objects.filter(item => item.key == object.key).length >= 2) {
                errors.objects = objectErrors
            }
        })

    }
    console.log(errors)
    console.log("err")
    return errors
}

export default validateObjects
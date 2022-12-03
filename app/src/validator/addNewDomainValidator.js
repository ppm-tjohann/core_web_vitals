import Joi from 'joi'

const AddNewDomainScheme = Joi.object({
                                        name: Joi.string().required(),
                                        sitemap: Joi.string().required(),
                                        favicon: Joi.string().required(),
                                      }).options({abortEarly: false})

const addNewDomainValidation = data => AddNewDomainScheme.validate(data)

export default addNewDomainValidation

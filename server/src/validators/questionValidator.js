export const questionValidator = {
    createQuestion: (req, res, next) => {
        // Validation logic for creating a question
        // Example: Check if question text and type are provided
        req.checkBody('text', 'Question text is required').notEmpty();
        req.checkBody('type', 'Question type is required').notEmpty();

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                data: errors
            });
        }
        next();
    },

    updateQuestion: (req, res, next) => {
        // Validation logic for updating a question
        // Example: Check if question ID is provided
        req.checkParams('id', 'Question ID is required').notEmpty();

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                data: errors
            });
        }
        next();
    },

    deleteQuestion: (req, res, next) => {
        // Validation logic for deleting a question
        // Example: Check if question ID is provided
        req.checkParams('id', 'Question ID is required').notEmpty();

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                data: errors
            });
        }
        next();
    },

    getQuestions: (req, res, next) => {
        // Validation logic for getting questions
        // Example: Check if pagination parameters are valid
        req.checkQuery('page', 'Page must be a number').optional().isNumeric();
        req.checkQuery('limit', 'Limit must be a number').optional().isNumeric();

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                success: false,
                message: 'Validation errors',
                data: errors
            });
        }
        next();
    }
};
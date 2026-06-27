export class ResponseUtil {
    static success(res, message, data = null) {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }

    static created(res, message, data = null) {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }

    static notFound(res, message) {
        return res.status(404).json({
            success: false,
            message,
            data: null
        });
    }

    static badRequest(res, message) {
        return res.status(400).json({
            success: false,
            message,
            data: null
        });
    }

    static unauthorized(res, message) {
        return res.status(401).json({
            success: false,
            message,
            data: null
        });
    }

    static forbidden(res, message) {
        return res.status(403).json({
            success: false,
            message,
            data: null
        });
    }

    static internalServerError(res, message) {
        return res.status(500).json({
            success: false,
            message,
            data: null
        });
    }
}
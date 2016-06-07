package com.dataart.appstore.service;

import com.dataart.appstore.dto.ValidationErrorDto;
import org.springframework.validation.FieldError;

import java.util.List;

/**
 * Created by dobodzinskiy on 07.06.2016.
 */
public interface ValidationService {

    ValidationErrorDto processFieldErrors(int errorCode, List<FieldError> fieldErrors);
}

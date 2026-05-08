import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import {Request,Response} from 'express';

@Catch(HttpException)
export class GlobalFilters implements ExceptionFilter{
  catch(exception:any, host:ArgumentsHost):void{
    const req = host.switchToHttp().getRequest<Request>()
    const res = host.switchToHttp().getResponse<Response>()
    console.log({
      url : req.url,
      method : req.method,
      body : req.body,
      headers : req.headers,
    })
    res.status(exception.getStatus()).json({statusCode: exception.getStatus(),message :exception.message})
  }
}
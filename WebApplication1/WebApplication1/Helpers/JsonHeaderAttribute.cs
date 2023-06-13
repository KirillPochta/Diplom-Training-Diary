using Microsoft.AspNetCore.Mvc.Filters;
using System.Net.Http.Headers;

public class JsonHeaderAttribute : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        if (!context.HttpContext.Request.Headers.ContainsKey("Content-Type"))
        {
            context.HttpContext.Request.Headers.Add("Content-Type", "application/json");
        }

        if (!context.HttpContext.Request.Headers.ContainsKey("Accept"))
        {
            context.HttpContext.Request.Headers.Add("Accept", "application/json");
        }

        base.OnActionExecuting(context);
    }
}
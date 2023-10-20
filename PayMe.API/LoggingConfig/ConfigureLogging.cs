using Microsoft.Extensions.Logging.Abstractions;

namespace PayMe.API.LoggingConfig;

public static class ConfigureLogging
{
    public static void ConfigureLoggingService(ILoggingBuilder loggingBuilder)
    {
        // Use NullLoggerFactory to disable logging
        loggingBuilder.Services.AddSingleton<ILoggerFactory>(new NullLoggerFactory());

        // Set the minimum logging level
        loggingBuilder.SetMinimumLevel(LogLevel.Information);

        // Add loggers as needed
        loggingBuilder.AddConsole();
        loggingBuilder.AddDebug();
    }
}
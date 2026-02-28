namespace Task3C.Models;

public class WorkerSchedule
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;
    public string AvatarColor { get; set; } = "#6366f1";

    /// <summary>Day abbreviation → shift key: "morning", "afternoon", "night", "off"</summary>
    public Dictionary<string, string> WeeklyShifts { get; set; } = new();
}

public class ScheduleViewModel
{
    public string WeekLabel { get; set; } = string.Empty;
    public List<string> Days { get; set; } = new();
    public List<WorkerSchedule> Workers { get; set; } = new();
    public int TotalWorkers => Workers.Count;
    public int TotalShiftsThisWeek => Workers.Sum(w =>
        w.WeeklyShifts.Values.Count(s => s != "off"));
    public int TotalHoursThisWeek => TotalShiftsThisWeek * 8;
}

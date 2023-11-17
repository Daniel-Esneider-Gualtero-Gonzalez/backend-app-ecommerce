import { createClient } from '@supabase/supabase-js'

const apiurl = "https://lwegixlqtccivrkuxjse.supabase.co"

const anonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3ZWdpeGxxdGNjaXZya3V4anNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI3MzQ0OTEsImV4cCI6MjAwODMxMDQ5MX0.5oWXB9ihieDqzkX8uSIgo3VuvciWGjsuUrKNIEarotw"


export const supabaseClient = createClient(apiurl,anonKey)
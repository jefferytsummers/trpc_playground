CREATE FUNCTION create_itinerary(
  p_timestamp TIMESTAMP,
  p_name VARCHAR(64),
  p_description VARCHAR(256),
  p_event_names VARCHAR(64)[],
  p_event_starts VARCHAR(5)[],
  p_event_ends VARCHAR(5)[],
  p_event_links VARCHAR(255)[],
  p_attendee_names VARCHAR(64)[],
  p_attendee_emails VARCHAR(255)[]
)
RETURNS VOID
AS $$
DECLARE
  v_event_count INTEGER := array_length(p_event_names, 1);
  v_attendee_count INTEGER := array_length(p_attendee_names, 1);
  v_index INTEGER;
BEGIN
  -- Insert the itinerary data into the database
  INSERT INTO "Itinerary" (name, date, description, "createdAt", "createdBy", "updatedAt", "updatedBy")
  VALUES (p_name, to_char(p_timestamp, 'YYYY-MM-DD'), p_description, p_timestamp, 'system', p_timestamp, 'system');

  -- Insert the events data into the database
  FOR v_index IN 1..v_event_count LOOP
    INSERT INTO "Event" (name, "itineraryName", "itineraryDate", starts, ends, link, "createdAt", "createdBy", "updatedAt", "updatedBy")
    VALUES (
      p_event_names[v_index],
      p_name,
      to_char(p_timestamp, 'YYYY-MM-DD'),
      p_event_starts[v_index],
      p_event_ends[v_index],
      p_event_links[v_index],
      p_timestamp,
      'system',
      p_timestamp,
      'system'
    );
  END LOOP;

  -- Insert the attendees data into the database
  FOR v_index IN 1..v_attendee_count LOOP
    INSERT INTO "Attendee" (name, email, "itineraryName", "itineraryDate", "createdAt", "createdBy", "updatedAt", "updatedBy")
    VALUES (
      p_attendee_names[v_index],
      p_attendee_emails[v_index],
      p_name,
      to_char(p_timestamp, 'YYYY-MM-DD'),
      p_timestamp,
      'system',
      p_timestamp,
      'system'
    );
  END LOOP;

EXCEPTION
  WHEN OTHERS THEN
    RAISE EXCEPTION 'Error creating itinerary: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
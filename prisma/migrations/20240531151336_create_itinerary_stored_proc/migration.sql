CREATE FUNCTION create_itinerary(
  p_date VARCHAR(64),
  p_name VARCHAR(64),
  p_description VARCHAR(256),
  p_event_names VARCHAR(64)[],
  p_event_starts VARCHAR(5)[],
  p_event_ends VARCHAR(5)[],
  p_event_links VARCHAR(255)[],
  p_attendee_names VARCHAR(64)[],
  p_attendee_emails VARCHAR(255)[],
  p_attendee_phones VARCHAR(20)[]
)
RETURNS VOID
AS $$
DECLARE
  v_itinerary_id VARCHAR(255);
  v_event_count INTEGER := array_length(p_event_names, 1);
  v_attendee_count INTEGER := array_length(p_attendee_names, 1);
  v_index INTEGER;
BEGIN
  -- Insert the itinerary data into the database
  INSERT INTO "Itinerary" (name, description)
  VALUES (p_date, p_name, p_description)
  RETURNING id INTO v_itinerary_id;
  -- Insert the events data into the database
  FOR v_index IN 1..v_event_count LOOP
    INSERT INTO "Event" (itinerary_id, name, starts, ends, link)
    VALUES (
      v_itinerary_id,
      p_event_names[v_index],
      p_event_starts[v_index],
      p_event_ends[v_index],
      p_event_links[v_index]
    );
  END LOOP;
  -- Insert the attendees data into the database
  FOR v_index IN 1..v_attendee_count LOOP
    INSERT INTO "Attendee" (itinerary_id, name, email)
    VALUES (
      v_itinerary_id,
      p_attendee_names[v_index],
      p_attendee_emails[v_index]
    );
  END LOOP;
  EXCEPTION
    WHEN OTHERS THEN
      RAISE EXCEPTION 'Error creating itinerary: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
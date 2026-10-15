import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { KnowledgeMap, UserProgress } from '../types/knowledge'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    !supabaseUrl.includes('placeholder')
)

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

const LOCAL_STORAGE_MAPS_KEY = 'knowledge_skeleton_saved_maps_v1'
const LOCAL_STORAGE_PROGRESS_KEY = 'knowledge_skeleton_progress_v1'

/**
 * Save a knowledge map either to Supabase or local browser storage.
 */
export async function saveKnowledgeMap(map: KnowledgeMap): Promise<{ success: boolean; error?: string }> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from('knowledge_maps').upsert(
        {
          id: map.id,
          topic: map.topic,
          title: map.title,
          description: map.description,
          central_node_id: map.centralNodeId,
          graph_data: map,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )

      if (error) throw error
      return { success: true }
    } else {
      // Local fallback
      const stored = localStorage.getItem(LOCAL_STORAGE_MAPS_KEY)
      const list: KnowledgeMap[] = stored ? JSON.parse(stored) : []
      const index = list.findIndex((m) => m.id === map.id)
      if (index >= 0) {
        list[index] = map
      } else {
        list.unshift(map)
      }
      localStorage.setItem(LOCAL_STORAGE_MAPS_KEY, JSON.stringify(list.slice(0, 30)))
      return { success: true }
    }
  } catch (err: any) {
    console.error('Failed to save knowledge map:', err)
    return { success: false, error: err.message || 'Storage error' }
  }
}

/**
 * Load user's saved maps
 */
export async function loadSavedMaps(): Promise<KnowledgeMap[]> {
  try {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase
        .from('knowledge_maps')
        .select('graph_data')
        .order('updated_at', { ascending: false })
        .limit(20)

      if (error) throw error
      return (data || []).map((row: any) => row.graph_data as KnowledgeMap)
    } else {
      const stored = localStorage.getItem(LOCAL_STORAGE_MAPS_KEY)
      return stored ? JSON.parse(stored) : []
    }
  } catch (err) {
    console.warn('Unable to load maps from remote; checking local cache:', err)
    const stored = localStorage.getItem(LOCAL_STORAGE_MAPS_KEY)
    return stored ? JSON.parse(stored) : []
  }
}

/**
 * Save learning progress for a specific node/concept
 */
export async function saveNodeProgress(
  mapId: string,
  nodeId: string,
  quizScore?: number
): Promise<void> {
  try {
    // Update local storage
    const stored = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY)
    const progressList: UserProgress[] = stored ? JSON.parse(stored) : []
    let mapProgress = progressList.find((p) => p.mapId === mapId)

    if (!mapProgress) {
      mapProgress = {
        mapId,
        completedNodeIds: [],
        quizScores: {},
        lastVisitedNodeId: nodeId,
      }
      progressList.push(mapProgress)
    }

    if (!mapProgress.completedNodeIds.includes(nodeId)) {
      mapProgress.completedNodeIds.push(nodeId)
    }
    mapProgress.lastVisitedNodeId = nodeId
    if (quizScore !== undefined) {
      mapProgress.quizScores[nodeId] = quizScore
    }

    localStorage.setItem(LOCAL_STORAGE_PROGRESS_KEY, JSON.stringify(progressList))

    // If Supabase is connected, sync remote
    if (isSupabaseConfigured && supabase) {
      await supabase.from('learning_progress').upsert(
        {
          knowledge_map_id: mapId,
          concept_node_id: nodeId,
          completion_state: 'completed',
          quiz_score: quizScore ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'knowledge_map_id,concept_node_id' }
      )
    }
  } catch (err) {
    console.warn('Progress sync warning:', err)
  }
}

/**
 * Get progress for a specific knowledge map
 */
export function getLocalMapProgress(mapId: string): UserProgress {
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_PROGRESS_KEY)
    const progressList: UserProgress[] = stored ? JSON.parse(stored) : []
    const found = progressList.find((p) => p.mapId === mapId)
    return (
      found || {
        mapId,
        completedNodeIds: [],
        quizScores: {},
      }
    )
  } catch {
    return { mapId, completedNodeIds: [], quizScores: {} }
  }
}
